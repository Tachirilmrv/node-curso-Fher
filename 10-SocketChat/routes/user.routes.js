const {check} = require('express-validator');
const {Router} = require('express');

const {validRole, validUserID, dupEmail} = require('../helpers/index.helper');
const {mwsValidation, validateJWT, hasRole} = require('../middlewares/index.mw');
const {getUsers, crtUser, updUser, delUser} = require('../controllers/user.controllers');

require('../controllers/user.controllers');



const router = Router();


// /api/user
router.get('/', getUsers);

router.post('/', [
    check("name", "Este no es un nombre válido").isAlphanumeric(),
    check("password", "Esta no es una contraseña válida").isLength( {min: 8} ),
    check("email", "Este no es un email válido").isEmail(),
    check("email").custom(dupEmail),
    check("role").custom(validRole),
    mwsValidation
], crtUser);

router.put('/:id', [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validUserID),
    check("role").custom(validRole),
    mwsValidation
], updUser);

router.delete('/:id', [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validUserID),
    mwsValidation
], delUser);



module.exports = router;