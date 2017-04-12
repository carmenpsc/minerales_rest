//File: controllers/tvshows.js
var mongoose = require('mongoose');
var minerales  = mongoose.model('minerales');

//GET - Return all minerales in the DB
exports.findAllMinerales = function(req, res) {
    minerales.find(function(err, tvshows) {
      if(err) res.send(500, err.message);
      console.log('GET /minerales')
          res.status(200).jsonp(tvshows);
      });
};

//GET - Return a mineral with specified ID
exports.findById = function(req, res) {
    minerales.findById(req.params.id, function(err, tvshow) {
      if(err) return res.send(500, err.message);

      console.log('GET /mineral/' + req.params.id);
          res.status(200).jsonp(tvshow);
      });
};

//POST - Insert a new mineral in the DB
exports.addMineral = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var mineral = new minerales({
        nombre:         req.body.nombre,
        habito:         req.body.habito,
        clasificacion:  req.body.clasificacion,
        densidad:       req.body.densidad,
        dureza:         req.body.dureza,
        tenacidad:      req.body.tenacidad,
        rotura:         req.body.rotura,
        brillo:         req.body.brillo,
        color:          req.body.color,
        colorRaya:      req.body.colorRaya
    });

    mineral.save(function(err, mineral) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(mineral);
    });
};

//PUT - Update a register already exists
exports.updateMineral = function(req, res) {
    minerales.findById(req.params.id, function(err, mineral) {
        mineral.nombre = req.body.nombre;
        mineral.habito = req.body.habito;
        mineral.clasificacion = req.body.clasificacion;
        mineral.densidad = req.body.densidad;
        mineral.dureza = req.body.dureza;
        mineral.tenacidad = req.body.tenacidad;
        mineral.rotura = req.body.rotura;
        mineral.brillo = req.body.brillo;
        mineral.color = req.body.color;
        mineral.colorRaya = req.body.colorRaya;

        mineral.save(function(err) {
            if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(mineral);
        });
    });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteMineral = function(req, res) {
    minerales.findById(req.params.id, function(err, mineral) {
        mineral.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};
