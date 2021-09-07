const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');
const Proyectos = require('../models/Proyectos');

const Usuarios = db.define('usuarios',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: sequelize.STRING(60),
        allowNull: false

    },
    password: {
        type: sequelize.STRING(60),
        allowNull: false
    }
});

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;