const {check} = require('express-validator');
const {Router} = require('express');

const {genericSearch} = require('../controllers/search.controllers');



const router = Router();


// /api/search
router.get("/", genericSearch)



module.exports = router;