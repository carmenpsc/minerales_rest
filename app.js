var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

require('./models/mineral')
var mineralesController = require('./controllers/mineralesController');
var minerales = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(minerales);

mongoose.connect('mongodb://localhost/minerales', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});

minerales.route('/minerales')
  .get(mineralesController.findAllMinerales)
  .post(mineralesController.addMineral);

minerales.route('/mineral/:id')
  .get(mineralesController.findById)
  .put(mineralesController.updateMineral)
  .delete(mineralesController.deleteMineral);

app.use('/api', minerales);
