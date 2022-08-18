const dbValidators = require("./dbValidators.helper");
const fileManagement = require("./fileManagement.helper");
const nonGoogleVeriy = require("./nonGoogleVerify.helper");



module.exports = {
    ...dbValidators,
    ...fileManagement,
    ...nonGoogleVeriy
}