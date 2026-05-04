import express, { type Request, type Response } from 'express';
import mongoose, { model, Schema } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json()); // Necesario para procesar el JSON de login.js y register.js

// --- CONFIGURACIÓN DE BASE DE DATOS ---
const dbName = "Lupauto";
const mongoURI = process.env.MONGO_URI || `mongodb://localhost:27017/${dbName}`;

async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log(`✅ Conectado con éxito a la base de datos: ${dbName}`);
    } catch (error) {
        console.error("❌ Error crítico al conectar a MongoDB:", error);
        process.exit(1);
    }
}

// --- ESQUEMAS Y MODELOS ---

// Esquema de Usuario (Punto clave para Login/Register)
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Nota: En la v2 usaremos bcrypt para el hash
    nombre: { type: String, required: true },
    rol: { 
        type: String, 
        enum: ['mecanico', 'vendedor', 'usuario'], 
        default: 'usuario' 
    }
});

export const User = model('User', userSchema);

// Esquema de Reservas (Terminología de España)
const reservaSchema = new Schema({
    tallerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Taller' 
    },
    cliente: { type: String, required: true },
    matricula: { type: String, required: true }, 
    fecha: { type: Date, required: true },
    estado: { 
        type: String, 
        enum: ['pendiente', 'confirmada', 'cancelada'], 
        default: 'pendiente' 
    },
    createdAt: { type: Date, default: Date.now }
});

const InformeSchema = new mongoose.Schema({
  inspectionId: String,
  mecanica: {
    diagnosis: String,
    kmVerif: String,
    motor: String,
    fugas: { aceite: String, refri: String },
    frenos: Array // [ {nombre: "Pastillas", valor: 70}, ... ]
  },
  carroceria: {
    estructural: String,
    repintados: String,
    masilla: String
  },
  estadoGeneral: String,
  status: { type: String, default: 'completada' }
});

export const Reserva = model('Reserva', reservaSchema);
export const Informe = model('Informe', InformeSchema);


// --- ENDPOINTS DE AUTENTICACIÓN ---

/**
 * Registro de nuevos usuarios
 * Se comunica con backend/src/public/js/register.js[cite: 1]
 */
app.post('/api/register', async (req: Request, res: Response) => {
    try {
        const { email, password, nombre, rol } = req.body;

        if (!email || !password || !nombre) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado." });
        }

        const nuevoUsuario = new User({ email, password, nombre, rol });
        await nuevoUsuario.save();

        return res.status(201).json({ message: "Registro exitoso. ¡Bienvenido!" });
    } catch (error) {
        console.error("Error en Registro:", error);
        return res.status(500).json({ message: "Error al conectar con el servidor." });
    }
});

/**
 * Inicio de sesión
 * Se comunica con backend/src/public/js/login.js[cite: 1]
 */
app.post('/api/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const usuario = await User.findOne({ email });

        // Validación de credenciales (comparación directa por ahora)[cite: 1]
        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Respuesta con los datos que espera el Switch de redirección en el frontend[cite: 1]
        return res.json({
            token: "token-sesion-lupauto-2026", // Token temporal
            role: usuario.rol,
            username: usuario.nombre
        });
    } catch (error) {
        console.error("Error en Login:", error);
        return res.status(500).json({ message: "Error: El servidor no responde." });
    }
});

// --- ENDPOINTS DE GESTIÓN DE INSPECCIONES ---

/**
 * Crear nueva reserva de inspección[cite: 1]
 */

app.post('/api/reports', async (req, res) => {
  try {
    const nuevoInforme = new Informe(req.body);
    await nuevoInforme.save();
    
    // Actualizamos el estado de la reserva a "completada"
    await Reserva.findOneAndUpdate({ lupId: req.body.reservaId }, { status: 'completada' });
    
    res.status(201).json({ message: "Informe guardado y reserva finalizada" });
  } catch (err) {
    res.status(500).json({ error: "Error al guardar el informe" });
  }
});

app.get('/api/consultar/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findOne({ lupId: req.params.id.toUpperCase() });
    
    if (!reserva) {
      // Usamos 'return' para cortar la ejecución aquí
      return res.status(404).json({ message: "No se encontró ninguna inspección con ese ID" });
    }
    
    // Si llega acá, devuelve la reserva
    return res.json(reserva); 
  } catch (err) {
    // Siempre hay que devolver algo en el catch también
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.post('/api/reservar-inspeccion', async (req: Request, res: Response) => {
    try {
        const { tallerId, cliente, fecha, matricula } = req.body;

        if (!tallerId || !cliente || !fecha || !matricula) {
            return res.status(400).json({ 
                success: false,
                error: "Faltan datos obligatorios para la reserva." 
            });
        }

        const nuevaReserva = new Reserva({
            tallerId,
            cliente,
            fecha: new Date(fecha),
            matricula
        });

        await nuevaReserva.save();
        
        return res.status(201).json({ 
            success: true,
            message: "Reserva registrada con éxito. Recibirás una confirmación en breve.",
            reservaId: nuevaReserva._id 
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error interno al procesar la reserva." });
    }
});

// Endpoint para guardar una nueva reserva/inspección
app.post('/api/reservas', async (req, res) => {
  try {
    const { 
      lupId, 
      plate, 
      vehicle, 
      vehicleType, 
      date, 
      time, 
      workshopId, 
      status 
    } = req.body;

    // 1. Validación básica
    if (!lupId || !plate || !vehicle) {
      return res.status(400).json({ 
        message: "Faltan datos obligatorios (lupId, plate o vehicle)" 
      });
    }

    // 2. Creamos el objeto para MongoDB (usando tu modelo de Reserva)
    const nuevaReserva = new Reserva({
      lupId: lupId.toUpperCase(),
      plate: plate.toUpperCase(),
      vehicle,
      vehicleType,
      date,
      time,
      workshopId, // Para que el taller lo vea en su dashboard
      status: status || 'Pendiente',
      createdAt: new Date()
    });

    // 3. Guardamos en la base de datos
    await nuevaReserva.save();

    console.log(`✅ Reserva guardada: ${lupId} para la matrícula ${plate}`);
    
    return res.status(201).json({ 
      message: "Reserva guardada con éxito", 
      id: nuevaReserva._id 
    });

    }catch (err: any) { // Cambiamos 'error' por 'err' para evitar conflictos
        console.error("❌ Error al guardar reserva:", err);
        
        // Ahora TypeScript sabe que 'err' es el objeto del error de MongoDB
        if (err.code === 11000) {
        return res.status(400).json({ message: "El ID de inspección ya existe" });
        }

        return res.status(500).json({ error: "Error interno del servidor al guardar" });
    }
});

/**
 * Cancelar/Eliminar reserva[cite: 1]
 */
app.delete('/api/cancelar-reserva/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultado = await Reserva.findByIdAndDelete(id);

        if (!resultado) {
            return res.status(404).json({ success: false, message: "Reserva no encontrada." });
        }

        return res.json({ success: true, message: "Reserva eliminada con éxito." });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error al eliminar la reserva." });
    }
});

// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Servidor de Lupauto corriendo en: http://localhost:${PORT}`);
});