var mongoose = require('mongoose'),
    Schema   = mongoose.Schema

var mineralSchema = new Schema({
  codigo:       {type: String},
  nombre:       { type: String },
  habito:       { type: String, enum:
                  ['Isómetricos o cúbicos', 'Alargados en una dirección', 'Alargados en dos direcciones','Formas intermedias', 'Granulares', 'Lamelares o laminares', 'Oolíticos', 'Concrecciones', 'Dendrítico o arborescente', 'Estalactitas']
                },
  clasificacion: { type: String, enum:
                  ['Elementos', 'Sulfuros', 'Sulfosales', 'Óxidos', 'Haluros', 'Carbonatos', 'Fofatos', 'Sulfatos', 'Silicatos']
                },
  densidad:     { type: Number},
  dureza:       { type: String, enum:
                  ['Talco', 'Yeso', 'Calcita', 'Fluorita', 'Apatito', 'Ortosa', 'Cuarzo', 'Topacio', 'Carindon', 'Diamante']
                },
  tenacidad:    { type: String, enum:
                  ['Frágil', 'Maleable', 'Séctil', 'Dúctil', 'Flexible', 'Elástico']
                },
  rotura:       { type: String, enum:
                  ['Fractura', 'Exfoliación']
                },
  brillo:       { type: String, enum:
                  ['Metálico', 'Semimetálico', 'No metálico']
                },
  color:        { type: String},
  colorRaya:    { type: String},
});

module.exports = mongoose.model('minerales', mineralSchema);
