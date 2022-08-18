const crtMsg = (user, msg) => {
    return {
        user,
        msg,
        date: new Date().toLocaleTimeString()
    };
}



module.exports = {
    crtMsg
}