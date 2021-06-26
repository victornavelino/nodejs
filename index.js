const express = require('express');
const routes = require('./routes');
const path = require('path'); // este path es palabra reservada que agrega librerias internas
const bodyParser =require('body-parser');

//Crear la conexion a la base de datos
const db = require('./config/db');

//Importamos los modelos
require('./models/Proyectos')

db.sync()
    .then(()=> console.log('Conectado al servidor'))
    .catch((error)=> console.log(error))
//CREAR un APP de Express
const app = express();

//Donde encontrar los archivos estaticos
app.use(express.static('public'));
//Habilitar PUG
app.set('view engine', 'pug');

//Añadir la carpeta de las vistas
app.set('views', path.join(__dirname,'./views'));

//Habilitamos libreria bodyParser para leer comandos en cosola enviados desde un formulario
app.use(bodyParser.urlencoded({extended: true}));


app.use('/',routes());

app.listen(8000);
