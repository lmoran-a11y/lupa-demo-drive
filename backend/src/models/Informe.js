const informeSchema = new mongoose.Schema({
  reservaId: { type: String, ref: 'Reserva' },
  mecanica: Object, // Guardamos el JSON de diagnosis, motor, etc.
  carroceria: Object,
  fotos: [String],
  estadoGeneral: String,
  createdAt: { type: Date, default: Date.now }
});