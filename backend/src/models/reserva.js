const reservaSchema = new mongoose.Schema({
  lupId: { type: String, required: true, unique: true }, // Ejemplo: LUP-1234
  plate: String,
  vehicle: String,
  date: Date,
  hour: String,
  status: { type: String, default: 'pendiente' }, // pendiente, pagado, completada
  tallerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Taller' }
});