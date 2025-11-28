const mongoose = require('mongoose');
const User = require('./models/User');
const Contenido = require('./models/Contenido');
require('dotenv').config();

const contenidos = [
  {
    titulo: 'Vida del Dr. José Gregorio Hernández',
    descripcion: 'José Gregorio Hernández Cisneros nació el 26 de octubre de 1864 en Isnotú, estado Trujillo, Venezuela.',
    contenido: 'Fue un médico, científico, profesor universitario y terciario franciscano venezolano. Destacó por su labor humanitaria.',
    imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    categoria: 'biografia'
  },
  {
    titulo: 'El Médico de los Pobres',
    descripcion: 'Conocido por atender gratuitamente a los más necesitados y llevar medicinas a quienes no podían pagarlas.',
    contenido: 'Su caridad y dedicación a los enfermos pobres le ganó el apodo de "El Médico de los Pobres".',
    imagen: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400',
    categoria: 'biografia'
  },
  {
    titulo: 'Beatificación 2021',
    descripcion: 'El Papa Francisco beatificó a José Gregorio Hernández el 30 de abril de 2021.',
    contenido: 'Se convirtió en el primer laico venezolano en ser beatificado por la Iglesia Católica.',
    imagen: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400',
    categoria: 'noticias'
  },
  {
    titulo: 'Milagros Atribuidos',
    descripcion: 'Numerosos testimonios de curaciones milagrosas atribuidas a su intercesión.',
    contenido: 'Miles de venezolanos dan testimonio de favores recibidos por su intercesión.',
    imagen: 'https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=400',
    categoria: 'milagros'
  },
  {
    titulo: 'Legado Científico',
    descripcion: 'Pionero de la medicina científica en Venezuela, estudió en París y fue profesor universitario.',
    contenido: 'Introdujo importantes avances científicos y fundó cátedras de medicina.',
    imagen: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400',
    categoria: 'biografia'
  },
  {
    titulo: 'Oración al Beato José Gregorio',
    descripcion: 'Oración tradicional para pedir la intercesión del Beato.',
    contenido: 'Oh Dios, que hiciste del Beato José Gregorio un testigo del Evangelio...',
    imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    categoria: 'oraciones'
  }
];

async function seed() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');
    
    // Limpiar colecciones existentes
    await Contenido.deleteMany({});
    console.log('🗑️  Colección Contenido limpiada');
    
    // Insertar contenidos de ejemplo
    const contenidosCreados = await Contenido.insertMany(contenidos);
    console.log(`✅ ${contenidosCreados.length} contenidos insertados`);
    
    // Crear usuario administrador de prueba
    const adminExiste = await User.findOne({ email: 'admin@catedra.com' });
    
    if (!adminExiste) {
      const admin = await User.create({
        nombre: 'Administrador',
        email: 'admin@catedra.com',
        password: 'admin123',
        rol: 'admin'
      });
      console.log('✅ Usuario admin creado:');
      console.log('   Email: admin@catedra.com');
      console.log('   Password: admin123');
    } else {
      console.log('ℹ️  Usuario admin ya existe');
    }
    
    // Crear usuario normal de prueba
    const usuarioExiste = await User.findOne({ email: 'usuario@test.com' });
    
    if (!usuarioExiste) {
      const usuario = await User.create({
        nombre: 'Usuario de Prueba',
        email: 'usuario@test.com',
        password: 'usuario123',
        rol: 'usuario'
      });
      console.log('✅ Usuario de prueba creado:');
      console.log('   Email: usuario@test.com');
      console.log('   Password: usuario123');
    } else {
      console.log('ℹ️  Usuario de prueba ya existe');
    }
    
    console.log('\n🎉 Base de datos poblada exitosamente!');
    console.log('\n📝 Puedes usar estas credenciales para login:');
    console.log('   Admin: admin@catedra.com / admin123');
    console.log('   Usuario: usuario@test.com / usuario123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seed();