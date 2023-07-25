
const express = require('express')
const cors = require('cors')


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    }

    middlewares(){

        this.app.use(cors());

        //Parse and body Lecture
        this.app.use(express.json()); 
        //public directory
        this.app.use(express.static('public'));

    }

    routes(){
       this.app.use( this.usuariosPath,require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto ',this.port);
        })
    }


}

module.exports = Server;