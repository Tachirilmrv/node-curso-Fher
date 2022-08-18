const {check} = require('express-validator');
const {Router} = require('express');

const {validProdID} = require('../helpers/index.helper');
const {mwsValidation, validateJWT, hasRole} = require('../middlewares/index.mw');
const {getProducts, getProductByID, crtProduct, updProduct, delProduct} = require('../controllers/products.controllers');



const router = Router();


router.get("/", [
    mwsValidation
], getProducts)

router.get("/:id", [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validProdID),
    mwsValidation
], getProductByID)

router.post("/", [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "La categoría del producto es obligatoria").not().isEmpty(),
    mwsValidation
], crtProduct)

router.put("/:id", [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validProdID),
    mwsValidation
], updProduct)

router.delete("/:id", [
    validateJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(validProdID),
    mwsValidation
], delProduct)



module.exports = router;