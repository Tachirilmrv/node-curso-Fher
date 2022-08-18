const Message = require('./Message');



class ChatManager {
    constructor() {
        this.messages = [];
        this.activeUsers = {};
    }


    get last10() {
        return this.messages.slice(0, 10);
    }

    get aUsersArray() {
        return Object.values(this.activeUsers);
    }


    sendMessage(uid, name, msg) {
        this.messages.unshift(new Message(uid, name, msg) );
    }

    newActiveUser(user) {
        this.activeUsers[user._id] = user;
    }

    disconnectUser(user) {
        delete this.activeUsers[user._id];
    }
}



module.exports = ChatManager;