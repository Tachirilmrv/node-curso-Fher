let userSt;
let socket;


// HTML References
const uidTxt     = document.querySelector("#uidTxt");
const msgTxt     = document.querySelector("#msgTxt");
const sendMsgBtn = document.querySelector("#sendMsgBtn");
const usersUl    = document.querySelector("#usersUl");
const chatUl     = document.querySelector("#chatUl");
const msgForm    = document.querySelector("form");



const main = async () => {
    await validJWT();


    socket = io( {
        "extraHeaders": {
            "token": localStorage.getItem("token")
        }
    } );


    socket.on("private-msg", ( {from, msg} ) => {
        alert(`Mensaje de: ${from} \n ${msg}`)
    } );

    socket.on("recieve-msgs", (last10) => {
        let last10HTML = '';


        last10.forEach( ( {name, msg} ) => {
            last10HTML += `
                <li>
                    <p>
                        <h5 class="text-success"> ${name} </h5>
                        <span class="fs-5 text-muted"> ${msg} </span>
                    </p>
                </li>
            `
        } );


        chatUl.innerHTML = last10HTML;
    } );
    
    socket.on("active-users", (users) => {
        let aUsersHTML = '';


        users.forEach( ( {uid, name} ) => {
            aUsersHTML += `
                <li>
                    <p>
                        <h5 class="text-success"> ${name} </h5>
                        <span class="fs-5 text-muted"> ${uid} </span>
                    </p>
                </li>
            `
        } );

        usersUl.innerHTML = aUsersHTML;
    } );
}

const validJWT = async () => {
    const t = localStorage.getItem("token");


    if(!t) {
        window.location = "index.html"


        throw new Error("No se ha provisto un token");
    }


    const resp = await fetch("http://localhost:8088/api/auth", {
        method: "GET",
        headers: {"x-token": t}
    } );
    const {user, token} = await resp.json();
    
    userSt = user;


    localStorage.setItem("token", token);
}


msgForm.addEventListener("submit", ev => {
    ev.preventDefault();

    
    const formData = {};

    
    for(let el of msgForm.elements) {
        if(el.name.length > 0) {
            formData[el.name] = el.value;
        }   
    }


    socket.emit("send-msg", formData);

    uidTxt.value = '';
    msgTxt.value = '';
} );



main();