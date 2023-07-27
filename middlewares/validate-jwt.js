const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');




const validateJWT = async (req=request,res=response,next)=>{
    
    const token = req.header('x-token');
    console.log(token);
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
       const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        
       //read user uid
       const usuario = await Usuario.findById(uid);

       if(!usuario){
            return res.status(401).json({
                msg:'token no valido - user dosn´t exist'
            })
       }

       //verify uid exist
        if(!usuario.estado){
            return res.status(401).json({
                msg:'token no valido - user state false'
            })
        }
       
       
       req.usuario = usuario;
        next();   
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'token no valido'
        })
    }
}

module.exports = {
    validateJWT
}