const {check} = require('express-validator');
const {Router} = require('express');

const {validCatID} = require('../helpers/index.helper');
const {mwsValidation, validateJWT, hasRole} = require('../middlewares/index.mw');
const {getCategories, getCategoryByID, crtCategory, updCategory, delCategory} = require('../controllers/categories.controllers');



const router = Router();


router.get("/", [
    mwsValidation
], getCategories)

router.get("/:id", [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validCatID),
    mwsValidation
], getCategoryByID)

router.post("/", [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    mwsValidation
], crtCategory)

router.put("/:id", [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validCatID),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    mwsValidation
], updCategory)

router.delete("/:id", [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validCatID),
    mwsValidation
], delCategory)



module.exports = router;