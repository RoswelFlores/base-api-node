const {response} = require('express');

const usersGet = (req, res = response)=> {
    const {h,p} = req.query;
    res.status(200).json({
       msg : 'GET CONTROLLER',
       p,
       h
    });
}
const usersPost =  (req, res)=> {

    const {nombre,edad} = req.body;
    res.status(200).json({
       msg : 'post CONTROLLER',
       nombre,
       edad
    });
}
const usersPut = (req, res)=> {
    const id = req.params.id;
    res.status(200).json({
       msg : 'put CONTROLLER',
       id
    });
}
const usersDelete = (req, res)=> {
    res.status(200).json({
       msg : 'delete CONTROLLER'
    });
}

module.exports ={
    usersGet,
    usersPost,
    usersPut,
    usersDelete
} 