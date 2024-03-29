var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

//modelos
require('./models/mineral')
require('./models/usuario')

//controladores
var mineralesController = require('./controllers/mineralesController');
var usuariosController = require('./controllers/usuariosController');

var router = express.Router();
var port= server.listen( process.env.HTTP_PORT || process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(router);

//Conexión con la base de datos mongodb subida en el servidor mlab
mongoose.connect('mongodb://carrpsc94:mineralPSC@ds161580.mlab.com:61580/minerales', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3001, function() {
    console.log("Node server running on http://localhost:3000");
  });
});

//URLs y sus corrrespondientes acciones
router.route('/minerales/:id')
  .get(mineralesController.findAllMinerales);

router.route('/mineral/:id')
  .post(mineralesController.addMineral);


router.route('/mineral/:id/:mineral')
  .delete(mineralesController.deleteMineral)
  .get(mineralesController.findById);

router.route('/modificar/:id/:mineral')
  .post(mineralesController.updateMineralByCodigo);

router.route('/usuarios')
  .get(usuariosController.findAllUsuarios)
  .post(usuariosController.addUsuario);

router.route('/usuario/:id')
  .get(usuariosController.findById)
  .put(usuariosController.updateUsuario)
  .delete(usuariosController.deleteUsuario);

router.route('/login')
  .post(usuariosController.findByCredenciales);

router.route('/registro')
.post(usuariosController.findByCorreoElectronico);

app.use('/api', router);
