const mongoose = require('mongoose');

const encuestaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: String,
  preguntas: [{
    pregunta: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      enum: ['texto', 'multiple', 'rating', 'fecha'],
      required: true
    },
    opciones: [String],
    requerida: {
      type: Boolean,
      default: true
    }
  }],
  respuestas: [{
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respuestas: mongoose.Schema.Types.Mixed,
    fecha: {
      type: Date,
      default: Date.now
    }
  }],
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activa: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Encuesta', encuestaSchema);