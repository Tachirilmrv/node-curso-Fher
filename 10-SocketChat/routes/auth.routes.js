const {check} = require('express-validator');
const {Router} = require('express');

const {existEmail} = require('../helpers/index.helper');
const {validateJWT} = require('../middlewares/jwt.mw');
const {mwsValidation} = require('../middlewares/mwsValidation.mw');
const {loginPost, googlePost, renewToken} = require('../controllers/auth.controllers');



const router = Router();


// api/auth/login
router.post('/login', [
    check("email", "Este no es un email válido").isEmail(),
    check("email").custom(existEmail),
    check("password", "Esta no es una contraseña válida").not().isEmpty(),
    mwsValidation
], loginPost);

// api/auth/google
router.post('/google', [
    check("id_token", "El token es necesario").not().isEmpty(),
    mwsValidation
], googlePost);

// api/auth
router.get('/', [
    validateJWT
], renewToken);



module.exports = router;