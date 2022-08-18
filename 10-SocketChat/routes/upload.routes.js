const {check} = require('express-validator');
const {Router} = require('express');

const {validCollection} = require('../helpers/dbValidators.helper');
const {getFile, updFileUploadCloudinary, uploadFileCloudinary} = require('../controllers/upload.controllers');
const {validateJWT, mwsValidation, existFile} = require('../middlewares/index.mw');



const router = Router();



// api/upload
router.get('/:collection/:id', [
    validateJWT,
    check("collection", "La colección debe ser especificada").exists(),
    check("collection").custom(validCollection),
    check("id", "Tiene que ser un id válido").isMongoId(),
    mwsValidation
], getFile);

router.post('/', [
    validateJWT,
    existFile,
    mwsValidation
], uploadFileCloudinary);

router.put('/:collection/:id', [
    validateJWT,
    existFile,
    check("collection", "La colección debe ser especificada").exists(),
    check("collection").custom(validCollection),
    check("id", "Tiene que ser un id válido").isMongoId(),
    mwsValidation
], updFileUploadCloudinary);



module.exports = router;