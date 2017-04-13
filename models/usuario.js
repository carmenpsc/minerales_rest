var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var usuarioSchema = new Schema({
  nombre:             { type: String, required: true },
  apellidos:          { type: String, required: true },
  correoElectronico:  { type: String, required: true },
  contrasenia:        { type: String, required: true },
  entidad:            { type: String, required: true }
});

module.exports = mongoose.model('usuarios', usuarioSchema);
