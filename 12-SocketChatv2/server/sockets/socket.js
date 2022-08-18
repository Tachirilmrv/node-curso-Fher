const {io} = require('../server');
const Users = require('../models/Users');

const {crtMsg} = require('../helpers/helpers');



const users = new Users();


io.on('connection', (client) => {
    client.on("joined-chat", (user) => {
        if(!user.name || !user.room)
            throw new Error("El nombre de usuario y la sala son obligatorios");


        client.join(user.room);


        users.addPerson(client.id, user.name, user.room);


        io.to(user.room).emit("admin-msg", {
            msg: crtMsg("Admin", `${user.name} se unió al chat ${user.room}`),
            success: true
        } );
        io.to(user.room).emit("online-users", users.onUsersByRoom(user.room) );
    } );

    client.on("bcast-msg", ( {msg}, cback) => {
        const p = users.getPerson(client.id);
        const cMsg = crtMsg(p.name, msg);


        client.broadcast.to(p.room).emit("bcast-msg",  cMsg);


        cback(cMsg);
    } );

    client.on("priv-msg", ( {to, msg} ) => {
        const p = users.getPerson(client.id);


        client.to(to).emit("priv-msg", crtMsg(p.name, msg) );
    } );


    client.on("disconnect", () => {
        const delP = users.delPerson(client.id);


        io.to(delP.room).emit("admin-msg", {
            msg: crtMsg("Admin", `${delP.name} abandonó el chat ${delP.room}`),
            success: false
        } );
        io.to(delP.room).emit("online-users", users.onUsersByRoom(delP.room) );
    } );
} );