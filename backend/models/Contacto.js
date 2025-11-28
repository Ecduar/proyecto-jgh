const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  telefono: {
    type: String,
    required: [false, 'El teléfono no es obligatorio'],
    match: [/^[0-9]{10,15}$/, 'Teléfono inválido']
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },
  tipoConsulta: {
    type: String,
    enum: ['informacion', 'sugerencia', 'queja', 'felicitacion'],
    required: true
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es obligatorio'],
    minlength: 10
  },
  archivo: {
    nombre: String,
    url: String,
    tipo: String
  },
  leido: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contacto', contactoSchema);