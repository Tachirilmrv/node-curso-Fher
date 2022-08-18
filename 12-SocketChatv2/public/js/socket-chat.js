const socket = io();
const user = getLoggedUser();


socket.on('connect', () => {
    console.log('Conectado al servidor');

    socket.emit('joined-chat', user);
} );


socket.on('bcast-msg', (msg) => {
    renderMsg(msg);
    scrollBottom();
} );

socket.on('online-users', (persons) => {
    renderUsers(persons);
} );

socket.on('private-msg', (msg) => {
    console.log('Mensaje Privado:', msg);
} );

socket.on("admin-msg", ( {msg, success} ) => {
    renderAdminMsg(msg, success);
} );


socket.on('disconnect', () => {
    console.log('Perdimos conexión con el servidor');
} );