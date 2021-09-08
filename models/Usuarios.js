const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt-nodejs');

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
}, {
    hooks: {
        beforeCreate:(usuario) => {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
       }
    }
});

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;