const { response } = require("express")



const isAdmin = (req,res = response,next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Hay que validar el token primero'
        })
    }

    const {rol,nombre} = req.usuario; 

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg : `${nombre} no es administrador - No tiene permisos`
        })
    }

    next();
}
const hasRole = (...roles)=>{

    return (req,res=response,next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Hay que validar el token primero'
            });
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })
        }


        next();
    }

}


module.exports = {
    isAdmin,
    hasRole
}