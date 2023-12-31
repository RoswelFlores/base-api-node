
const express = require('express')
const cors = require('cors')

const {dbConnection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        this.app.use(cors());

        //Parse and body Lecture
        this.app.use(express.json()); 
        //public directory
        this.app.use(express.static('public'));

    }

    routes(){
       this.app.use( this.authPath,require('../routes/auth'));
       this.app.use( this.usuariosPath,require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto ',this.port);
        })
    }


}

module.exports = Server;