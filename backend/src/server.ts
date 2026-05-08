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

// --- ESQUEMAS Y MODELOS ---

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    rol: { type: String, enum: ['mecanico', 'vendedor', 'usuario'], default: 'usuario' }
});

const reservaSchema = new Schema({
    lupId: { type: String, required: true, unique: true },
    plate: { type: String, required: true },
    vehicle: { type: String, required: true },
    vehicleType: String,
    date: String,
    time: String,
    workshopId: String,
    status: { type: String, default: 'Pendiente' },
    createdAt: { type: Date, default: Date.now }
});

const informeSchema = new Schema({
    reservaId: String,
    inspectionId: String,
    mecanica: {
        diagnosis: String,
        kmVerif: String,
        motor: String,
        fugas: { aceite: String, refri: String },
        frenos: Array
    },
    carroceria: {
        estructural: String,
        repintados: String,
        masilla: String
    },
    estadoGeneral: String,
    status: { type: String, default: 'completada' }
});

export const User = model('User', userSchema);
export const Reserva = model('Reserva', reservaSchema);
export const Informe = model('Informe', informeSchema);

// --- SEEDING Y CONEXIÓN ---
async function seedUser() {
    try {
        const adminEmail = "taller@lupauto.es";
        const exists = await User.findOne({ email: adminEmail });
        if (!exists) {
            await new User({
                email: adminEmail,
                password: "1234",
                nombre: "Taller Principal",
                rol: "mecanico"
            }).save();
            console.log("👤 Usuario mecánico inicial creado.");
        }
    } catch (error) {
        console.error("❌ Error en seeding:", error);
    }
}

async function connectDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log(`✅ MongoDB Conectado: ${dbName}`);
        await seedUser();
    } catch (error) {
        console.error("❌ Error crítico MongoDB:", error);
        process.exit(1);
    }
}

// --- ENDPOINTS DE AUTENTICACIÓN ---

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
        return res.status(500).json({ message: "Error en el servidor" });
    }
});

// --- ENDPOINTS DE RESERVAS E INSPECCIONES ---

// 1. Crear Reserva (Desde pantalla de confirmación)
app.post('/api/reservas', async (req: Request, res: Response) => {
    try {
        const { lupId, plate, vehicle, vehicleType, date, time, workshopId } = req.body;
        if (!lupId || !plate || !vehicle) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }
        const nuevaReserva = new Reserva({
            lupId: lupId.toUpperCase(),
            plate: plate.toUpperCase(),
            vehicle, vehicleType, date, time, workshopId
        });
        await nuevaReserva.save();
        return res.status(201).json({ message: "Reserva guardada", id: nuevaReserva._id });
    } catch (err: any) {
        if (err.code === 11000) return res.status(400).json({ message: "ID duplicado" });
        return res.status(500).json({ error: "Error al guardar reserva" });
    }
});

// 2. Consultar Reserva por ID (Para el buscador del taller)
app.get('/api/consultar/:id', async (req: Request, res: Response) => {
    try {
        const reserva = await Reserva.findOne({ lupId: String(req.params.id).toUpperCase() });
        if (!reserva) return res.status(404).json({ message: "Inspección no encontrada" });
        return res.json(reserva);
    } catch (err) {
        return res.status(500).json({ error: "Error interno" });
    }
});

// 3. Guardar Informe Final
app.post('/api/reports', async (req: Request, res: Response) => {
    try {
        const nuevoInforme = new Informe(req.body);
        await nuevoInforme.save();
        // Al completar el informe, marcamos la reserva como completada
        await Reserva.findOneAndUpdate({ lupId: req.body.inspectionId }, { status: 'completada' });
        return res.status(201).json({ message: "Informe guardado y reserva finalizada" });
    } catch (err) {
        return res.status(500).json({ error: "Error al guardar el informe" });
    }
});

// --- RUTAS DE PÁGINAS ---
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, './public/page/index.html')));
app.get('/login', (_req, res) => res.sendFile(path.join(__dirname, './public/page/login.html')));

// --- ARRANQUE ---
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
    connectDB();
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
