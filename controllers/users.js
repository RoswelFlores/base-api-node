const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');






const usersGet = async(req, res = response)=> {

    const {limit,from = 0} = req.query;


    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .skip(Number(from))
        .limit(Number(limit))
    ]);


    res.status(200).json({
        total,
        usuarios
    });




}
const usersPost =  async(req, res)=> {

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    

    //encriptar
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();
    
    res.status(201).json({
        usuario
    });
}


const usersPut =async(req, res=response)=> {
    const id = req.params.id;
    const {_id,password,google,correo,...resto} = req.body;

    //validate BD
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuarioDB = await Usuario.findByIdAndUpdate(id,resto);

    res.status(200).json({
       id
    });
}
const usersDelete = async(req, res)=> {

    const {id} = req.params;

    // Borrar del todo const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.status(200).json(usuario);
}

module.exports ={
    usersGet,
    usersPost,
    usersPut,
    usersDelete
} 