const Encuesta = require('../models/Encuesta');

exports.obtenerEncuestas = async (req, res) => {
  try {
    const encuestas = await Encuesta.find({ activa: true })
      .populate('creador', 'nombre');
    
    res.status(200).json({
      success: true,
      data: encuestas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener encuestas'
    });
  }
};

exports.crearEncuesta = async (req, res) => {
  try {
    req.body.creador = req.usuario.id;
    const encuesta = await Encuesta.create(req.body);
    
    res.status(201).json({
      success: true,
      data: encuesta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear encuesta',
      error: error.message
    });
  }
};

exports.responderEncuesta = async (req, res) => {
  try {
    const encuesta = await Encuesta.findById(req.params.id);
    
    if (!encuesta) {
      return res.status(404).json({
        success: false,
        message: 'Encuesta no encontrada'
      });
    }

    encuesta.respuestas.push({
      usuario: req.usuario.id,
      respuestas: req.body.respuestas
    });

    await encuesta.save();

    res.status(200).json({
      success: true,
      message: 'Respuesta guardada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al guardar respuesta'
    });
  }
};