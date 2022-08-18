const jwt = require('jsonwebtoken');



const nonGoogleVerify = async (id_token = '') => {
    const {email, name} = await jwt.verify(id_token, "jvnaToJ7pZkWbtSv1p3Q-8aqWAbC");

    return {email, name}
}



module.exports = {
    nonGoogleVerify
}