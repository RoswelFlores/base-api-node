

const {Router} = require('express');
const { usersGet,
    usersPost,
    usersDelete,
    usersPut } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { esRoleValido, emailExiste, existeUsuarioId } = require('../helpers/db-validators');

const router = Router();

router.get('/',usersGet);   

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(esRoleValido),
    validateFields
], usersPut);   




router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y debe tener mas de 6 caracteres').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
   // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    check('correo').custom(emailExiste),
    validateFields
],usersPost);   
router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validateFields
], usersDelete);   

module.exports = router;