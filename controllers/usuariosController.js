//Variables de la aplicacion
var mongoose = require('mongoose');
var usuarios  = mongoose.model('usuarios');

//GET - Devuelve todos los usuarios administradores persistentes en la base de datos
exports.findAllUsuarios = function(req, res) {
    usuarios.find(function(err, usuarios) {
      if(err) res.send(500, err.message);
      console.log('GET /usuarios')
          res.status(200).jsonp(usuarios);
      });
};

//GET - Devuelve el usuario administrador cuyo ID es igual que el parametró de la función
exports.findById = function(req, res) {
    usuarios.findById(req.params.id, function(err, usuario) {
      if(err) return res.send(500, err.message);

      console.log('GET /usuario/' + req.params.id);
          res.status(200).jsonp(usuario);
      });
};

//POST - Comprueba si un usuario administrador ya está registrado en el sistema y le deja acceder a él. (Login)
exports.findByCredenciales = function(req, res){
    console.log('POST /login');
    console.log(req.body);
  var correoElectronicoUsuario = req.body.correoElectronico;
  var contrasenia = req.body.contrasenia;
  usuarios.findOne({'correoElectronico': correoElectronicoUsuario, 'contrasenia': contrasenia}, function(err, usuario){
    if(err) return res.send(500, err.message);
    res.status(200).jsonp(usuario);
  });
};

//POST - Comprueba que el correo electróncio que se introduce en el sistema no exista ya.
exports.findByCorreoElectronico = function(req, res){
    console.log('POST /login');
    console.log(req.body);
    var correoElectronicoUsuario = req.body.correoElectronico;
    usuarios.findOne({'correoElectronico': correoElectronicoUsuario}, function(err, usuario){
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(usuario);
    });
};

//POST - Añade un nuevo usuario adminitrador a la base de datos
exports.addUsuario = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var usuario = new usuarios({
        nombre:             req.body.nombre,
        apellidos:          req.body.apellidos,
        correoElectronico:  req.body.correoElectronico,
        contrasenia:        req.body.contrasenia,
        entidad:            req.body.entidad
    });

    usuario.save(function(err, mineral) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(usuario);
    });
};

//PUT - Permite modificar los datos de un usuario administrador
exports.updateUsuario = function(req, res) {
    usuarios.findById(req.params.id, function(err, usuario) {
        usuario.nombre = req.body.nombre;
        usuario.apellidos = req.body.apellidos;
        usuario.correoElectronico = req.body.correoElectronico;
        usuario.contrasenia = req.body.contrasenia;
        usuario.entidad = req.body.entidad;

        usuario.save(function(err) {
            if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(usuario);
        });
    });
};

//DELETE - Elimina todos los datos de un usuario administrador
exports.deleteUsuario = function(req, res) {
    usuarios.findById(req.params.id, function(err, usuario) {
        usuario.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};
