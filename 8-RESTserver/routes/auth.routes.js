const {check} = require('express-validator');
const {Router} = require('express');

const {loginPost, googlePost} = require('../controllers/auth.controllers');
const {existEmail} = require('../helpers/index.helper');
const {mwsValidation} = require('../middlewares/mwsValidation.mw');



const router = Router();


// api/auth/login
router.post('/login', [
    check("name", "Este no es un nombre válido").isAlphanumeric(),
    check("email", "Este no es un email válido").isEmail(),
    check("email").custom(existEmail),
    check("password", "Esta no es una contraseña válida").not().isEmpty(),
    mwsValidation
], loginPost);

// api/categories/google
router.post('/google', [
    check("id_token", "El token es necesario").not().isEmpty(),
    mwsValidation
], googlePost);



module.exports = router;