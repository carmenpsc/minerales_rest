var mongoose = require('mongoose');
var usuarios  = mongoose.model('usuarios');

//GET - Return all usuarios in the DB
exports.findAllUsuarios = function(req, res) {
    usuarios.find(function(err, tvshows) {
      if(err) res.send(500, err.message);
      console.log('GET /usuarios')
          res.status(200).jsonp(tvshows);
      });
};

//GET - Return a usuario with specified ID
exports.findById = function(req, res) {
    usuarios.findById(req.params.id, function(err, usuario) {
      if(err) return res.send(500, err.message);

      console.log('GET /usuario/' + req.params.id);
          res.status(200).jsonp(usuario);
      });
};

//POST - Insert a new usuario in the DB
exports.addUsuario = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var usuario = new minerales({
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

//PUT - Update a register already exists
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

//DELETE - Delete a usuario with specified ID
exports.deleteUsuario = function(req, res) {
    usuarios.findById(req.params.id, function(err, usuario) {
        usuario.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};
