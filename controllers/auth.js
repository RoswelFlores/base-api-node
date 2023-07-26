const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJWT");


const login = async (req,res = response)=>{

    const{correo,password} = req.body;


    try {

        //Verify email
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg : 'Usuario / password no son correctos'
            });
        }
        //User active
        if(!usuario.estado){
            return res.status(400).json({
                msg : 'Usuario / password no son correctos - estado false'
            });
        }
        //Verify password 
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg : 'Usuario / password no son correctos - password'
            });
        }
        //Generate JWT
        const token = await generateJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return  res.status(500).json({
            msg:'Comuniquese con el administrador'
        })
    }


    
}

module.exports={
    login
}