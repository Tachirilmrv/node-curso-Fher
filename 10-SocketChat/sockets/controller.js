const ChatManager = require("../models/ChatManager");
const {checkJWTSocket} = require('../helpers/index.helper');



const chatM = new ChatManager();


const socketController = async (socket) => {
    const token = socket.handshake.headers["token"];
    const user = await checkJWTSocket(token);


    if(!user) {
        return socket.disconnect();
    }


    userUid = user._id.toString().split('"');


    chatM.newActiveUser(user);
    ebActiveUsers(socket);
    socket.emit("recieve-msgs", chatM.last10);
    socket.join(userUid);
    

    socket.on("send-msg", ( {uidTxt, msgTxt} ) => {
        if(uidTxt) {
            socket.to(uidTxt).emit("private-msg", {
                from: user.name,
                msg: msgTxt
            } );
        } else {
            chatM.sendMessage(userUid, user.name, msgTxt);
            socket.emit("recieve-msgs", chatM.last10);
            socket.broadcast.emit("recieve-msgs", chatM.last10);
        }
    } );
    
    socket.on("disconnect", () => {
        chatM.disconnectUser(user);
        ebActiveUsers(socket);
    } );
}

const ebActiveUsers = (socket) => {
    socket.emit("active-users", chatM.aUsersArray);
    socket.broadcast.emit("active-users", chatM.aUsersArray);
}



module.exports = socketController;