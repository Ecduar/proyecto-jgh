const mongoose = require('mongoose');

const contenidoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  contenido: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    default: 'https://via.placeholder.com/400x300'
  },
  categoria: {
    type: String,
    enum: ['biografia', 'milagros', 'oraciones', 'noticias', 'eventos'],
    default: 'noticias'
  },
  activo: {
    type: Boolean,
    default: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contenido', contenidoSchema);