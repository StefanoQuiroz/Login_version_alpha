const mongoose = require ('mongoose');
const {mongoDB} = require ('./keys');

mongoose.connect(mongoDB.URI,{useNewUrlParser: true}).then(db => console.log("Base de datos conectada")).catch(err => console.error(err));