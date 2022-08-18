const jwt = require('./jwt.mw');
const files = require('./files.mw');
const mwsValidation = require('./mwsValidation.mw');
const rolesValidation = require('./rolesValidation.mw');



module.exports = {
    ...jwt,
    ...files,
    ...mwsValidation,
    ...rolesValidation
}