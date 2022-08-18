setTimeout( () => {
    console.log("Hola Mundo");
}, 1000);



const getUserByiD = (id, callback) => {
    const user = {
        id: id,
        name: "Tachiri",
    }

    setTimeout( () => {
        callback(user);
    }, 1500);
}

getUserByiD(8, (user) => {
    console.log(user);
} );