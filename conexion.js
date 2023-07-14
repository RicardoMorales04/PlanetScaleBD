var Sequelize = require("sequelize");
var UsuarioModelo = require("./modelos/usuarios");
require("dotenv").config();


var db = process.env.DB_MYSQL;
var usuario = process.env.USUARIO_MYSQL;
var password = process.env.PASSWORD_MYSQL;
var host = process.env.HOST_MYSQL;
var port = process.env.PORT_MYSQL;

var conexion = new Sequelize(db,usuario,password,{
    host:host,
    port:port,
    dialect: 'mysql',
    dialectOptions:{
        ssl:{
            rejectUnauthorized:true
        }
    } 
});

conexion.sync({force:false})

.then(()=>{
    console.log("Conectado a MYSQL de PlanetScale");
})

.catch((err)=>{
    console.log("Error al conectarse a MYSQL de PlanetScale "+err);
    console.log("Intentar una conexion Local");
    // db = process.env.DB_MYSQL_LOCAL;
    // usuario = process.env.USUARIO_MYSQL_LOCAL;
    // password = process.env.PASSWORD_MYSQL_LOCAL;
    // host = process.env.HOST_MYSQL_LOCAL;
    // port = process.env.PORT_MYSQL_LOCAL;

    // conexion = new Sequelize(db,usuario,password,{
    //     host:host,
    //     port:port,
    //     dialect: 'mysql'
    //     });
    //     conexion.sync({force:false})
    //     .then(()=>{
    //         console.log("Conectado a MYSQL Local");
    //     })
    //     .catch((err)=>{
    //         console.log("Error al conectarse a MYSQL Local");
    //     });
});

var Usuario = UsuarioModelo(conexion);

module.exports = {
    Usuario:Usuario
}
