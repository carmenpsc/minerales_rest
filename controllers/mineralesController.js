var mongoose = require('mongoose');
var usuarios = mongoose.model('usuarios');
var minerales = mongoose.model('minerales');

//GET - Devuelve todos los mienrales de un usuario adminsitrador
exports.findAllMinerales = function(req, res) {
    usuarios.find({'_id': req.params.id}, 'minerales', function(err, minerales) {
        if(err) res.send(500, err.message);
        console.log('GET /minerales')
        res.status(200).jsonp(minerales);
    });
};

//GET - Devuelve el mineral
exports.findById = function(req, res) {
    minerales.findById(req.params.id, function(err, mineral) {
        if(err) return res.send(500, err.message);

        console.log('GET /mineral/' + req.params.id);
        res.status(200).jsonp(mineral);
    });
};

//POST - Añade un nuevo mineral a la lista de minerales de un usuario administrador determinado (ID)
exports.addMineral = function(req, res) {
    console.log('POST /mineral');
    console.log(req.body);
    usuarios.findByIdAndUpdate(
        req.params.id,
        {$push: {'minerales':req.body}},
        {safe: true, upsert: true, strict: false},
        function(err, usuario) {
            if(err) return res.status(500).send( err.message);
            res.status(200).jsonp(usuario);
        }
    );
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

//DELETE - Eliminar el mineral de un usuario administrador determinado (ID)
exports.deleteMineral = function(req, res) {
    usuarios.findByIdAndUpdate(
        req.params.id,
        {$pull: {'minerales': { codigo: req.params.mineral }}},
        {safe: true, upsert: true, strict: false},
        function(err, mineral) {
            if(err) return res.status(500).send( err.message);
            res.status(200).jsonp(mineral);
        }
    );
};
