var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var mineralSchema = new Schema({
  codigo:       {type: String},
  nombre:       { type: String },
  habito:       { type: String, enum:
                  ['Isometricos o cubicos', 'Alargados en una direccion', 'Alargados en dos direcciones','Formas intermedias', 'Granulares', 'Lamelares o laminares', 'Ooliticos', 'Concrecciones', 'Dendritico o arborescente', 'Estalactitas']
                },
  clasificacion: { type: String, enum:
                  ['Elementos', 'Sulfuros', 'Sulfosales', 'Oxidos', 'Haluros', 'Carbonatos', 'Fofatos', 'Sulfatos', 'Silicatos']
                },
  densidad:     { type: Number},
  dureza:       { type: String, enum:
                  ['Talco', 'Yeso', 'Calcita', 'Fluorita', 'Apatito', 'Ortosa', 'Cuarzo', 'Topacio', 'Carindon', 'Diamante']
                },
  tenacidad:    { type: String, enum:
                  ['Fragil', 'Maleable', 'Sectil', 'Ductil', 'Flexible', 'Elastico']
                },
  rotura:       { type: String, enum:
                  ['Fractura', 'Exfoliacion']
                },
  brillo:       { type: String, enum:
                  ['Metalico', 'Semimetalico', 'No metalico']
                },
  color:        { type: String},
  colorRaya:    { type: String},
});

module.exports = mongoose.model('minerales', mineralSchema);
