const sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');
const Proyectos = require('./Proyectos');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agregar un email valido'
            },
            notEmpty: {
                msg: 'El email no puede estar Vacio'
            }
        }, 
        unique: {
            args: true,
            msg: 'Usuario Ya Registrado!'
        }

    },
    password: {
        type: sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede estar Vacio'
            }
        }
    }
}, {
    hooks: {
        beforeCreate: (usuario) => {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});
Usuarios.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

//Usuarios.hasMany(Proyectos);

module.exports = Usuarios;