

const {Schema,model} = require('mongoose');

const usuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El nombre es correo'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:true
    },
})

usuarioSchema.methods.toJSON = function(){
    const{ __v,password, ...rest} = this.toObject();
    return rest;
}

module.exports = model('Usuario',usuarioSchema);