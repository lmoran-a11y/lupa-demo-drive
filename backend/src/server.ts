import express, { type Request, type Response } from 'express';
import mongoose, { model, Schema } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './public/page')));

// --- CONFIGURACIÓN DE BASE DE DATOS ---
const dbName = "Lupauto";
const mongoURI = process.env.MONGO_URI || `mongodb://localhost:27017/${dbName}`;

// 1. FUNCIÓN PARA CREAR USUARIO INICIAL (MECÁNICO) SI NO EXISTE
async function seedUser() {
    try {
        const adminEmail = "taller@lupauto.es";
        const exists = await User.findOne({ email: adminEmail });
        
        if (!exists) {
            const adminUser = new User({
                email: adminEmail,
                password: "1234",
                nombre: "Taller Principal",
                rol: "mecanico"
            });
            await adminUser.save();
            console.log("👤 Usuario mecánico inicial creado: taller@lupauto.es / 1234");
        }
    } catch (error) {
        console.error("❌ Error al crear el usuario inicial:", error);
    }
}

async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log(`✅ Conectado con éxito a la base de datos: ${dbName}`);
        await seedUser(); // Ejecutar seeding tras conectar
    } catch (error) {
        console.error("❌ Error crítico al conectar a MongoDB:", error);
        process.exit(1);
    }
}

// --- ESQUEMAS Y MODELOS ---

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    rol: { type: String, enum: ['mecanico', 'vendedor', 'usuario'], default: 'usuario' }
});

export const User = model('User', userSchema);

const reservaSchema = new Schema({
    lupId: { type: String, required: true, unique: true },
    plate: { type: String, required: true },
    vehicle: { type: String, required: true },
    vehicleType: String,
    date: String,
    time: String,
    workshopId: String, // Referencia para el dashboard del taller
    status: { type: String, default: 'Pendiente' },
    createdAt: { type: Date, default: Date.now }
});

export const Reserva = model('Reserva', reservaSchema);

// --- ENDPOINTS ---

// 2. ENDPOINT POST /api/reservas (Para confirmación de reserva)
app.post('/api/reservas', async (req: Request, res: Response) => {
    try {
        const { lupId, plate, vehicle, vehicleType, date, time, workshopId } = req.body;

        if (!lupId || !plate || !vehicle) {
            return res.status(400).json({ message: "Faltan datos obligatorios (lupId, plate, vehicle)" });
        }

        const nuevaReserva = new Reserva({
            lupId: lupId.toUpperCase(),
            plate: plate.toUpperCase(),
            vehicle,
            vehicleType,
            date,
            time,
            workshopId,
            status: 'Pendiente'
        });

        await nuevaReserva.save();
        console.log(`✅ Reserva guardada: ${lupId} - ${plate}`);
        
        return res.status(201).json({ message: "Reserva guardada con éxito", id: nuevaReserva._id });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "El ID de inspección ya existe." });
        }
        return res.status(500).json({ error: "Error al guardar la reserva." });
    }
});

// Endpoint de Login (Existente)
app.post('/api/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const usuario = await User.findOne({ email });

        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        return res.json({
            token: "token-sesion-lupauto-2026",
            role: usuario.rol,
            username: usuario.nombre
        });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor." });
    }
});

// Rutas estáticas y páginas
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, './public/page/index.html')));
app.get('/login', (_req, res) => res.sendFile(path.join(__dirname, './public/page/login.html')));

// INICIO DEL SERVIDOR
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});