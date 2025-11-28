const Contacto = require('../models/Contacto');

exports.crearContacto = async (req, res) => {
  try {
    console.log('📨 Datos recibidos:', req.body);
    
    const contacto = await Contacto.create(req.body);
    
    console.log('✅ Contacto creado:', contacto._id);
    
    res.status(201).json({
      success: true,
      data: contacto,
      message: 'Contacto creado exitosamente'
    });
  } catch (error) {
    console.error('❌ Error al crear contacto:', error);
    res.status(400).json({
      success: false,
      message: 'Error al crear contacto',
      error: error.message
    });
  }
};

exports.obtenerContactos = async (req, res) => {
  try {
    const contactos = await Contacto.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contactos.length,
      data: contactos
    });
  } catch (error) {
    console.error('❌ Error al obtener contactos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener contactos',
      error: error.message
    });
  }
};