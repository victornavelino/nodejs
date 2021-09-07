const express = require('express');
const routes = require('./routes');
const path = require('path'); // este path es palabra reservada que agrega librerias internas
const bodyParser =require('body-parser');
const helpers = require('./helpers'); // helpers con funciones accesibles desde todo el proyecto

//Crear la conexion a la base de datos
const db = require('./config/db');

//Importamos los modelos
require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')

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

//pasar vardump a la aplicacion
app.use((req,res,next)=>{
    //res.locals es reservado, res es de respuesta y locals es para 
    //que este disponible en cualquier parte del codigo, sean vistas o controladores
    res.locals.vardump = helpers.vardump;
    res.locals.anio = 2019;
    res.locals.title= "PROYECTOSOK"
    next();
});

//Habilitamos libreria bodyParser para leer comandos en cosola enviados desde un formulario
app.use(bodyParser.urlencoded({extended: true}));


app.use('/',routes());

app.listen(8000);
