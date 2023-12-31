const Role = require('../models/role');
const Usuario = require('../models/usuario');



const esRoleValido = async(rol = '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la bd`);
    }
}

const emailExiste = async(correo = '' )=>{
   const isExist =  await Usuario.findOne({correo});
    if(isExist) {
        throw new Error(`El correo ${correo} ya existe en la bd`);
    }
} 
const existeUsuarioId = async(id)=>{

    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioId
}