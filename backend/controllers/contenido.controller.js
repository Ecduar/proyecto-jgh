const Contenido = require('../models/Contenido');

exports.obtenerContenidos = async (req, res) => {
  try {
    const contenidos = await Contenido.find({ activo: true })
      .sort({ createdAt: -1 })
      .populate('autor', 'nombre email');
    
    res.status(200).json({
      success: true,
      count: contenidos.length,
      data: contenidos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener contenidos'
    });
  }
};

exports.crearContenido = async (req, res) => {
  try {
    req.body.autor = req.usuario.id;
    const contenido = await Contenido.create(req.body);
    
    res.status(201).json({
      success: true,
      data: contenido
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear contenido',
      error: error.message
    });
  }
};

exports.buscarContenidos = async (req, res) => {
  try {
    const { q } = req.query;
    
    const contenidos = await Contenido.find({
      activo: true,
      $or: [
        { titulo: { $regex: q, $options: 'i' } },
        { descripcion: { $regex: q, $options: 'i' } }
      ]
    });
    
    res.status(200).json({
      success: true,
      count: contenidos.length,
      data: contenidos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en la búsqueda'
    });
  }
};