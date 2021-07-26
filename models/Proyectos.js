
const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('Proyectos', {

    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: sequelize.STRING,
    url: sequelize.STRING
}, {
    hooks: {
        beforeCreate:(proyecto) => {
            console.log("antes de insertar registro")
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = url;
       }
    }
});

module.exports = Proyectos;