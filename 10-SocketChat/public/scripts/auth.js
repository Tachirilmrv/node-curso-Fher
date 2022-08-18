const cForm = document.querySelector("form");



cForm.addEventListener("submit", ev => {
    ev.preventDefault();


    const formData = {};
    const url = "http://localhost:8088/api/auth/login"

    
    for (let el of cForm.elements) {
        if(el.name.length > 0) {
            formData[el.name] = el.value
        }
    }


    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    } )
        .then(resp => resp.json() )
        .then( ( {token} ) => localStorage.setItem("token", token) )
        .catch(console.log)
} );


function onGSignIn() {
    var url = "http://localhost:8088/api/auth/google"
    var id_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwMTIzNDU2Nzg5MDEiLCJlbWFpbCI6ImZlcm5hbmRvLmhlcnJlcmE4NUBnbWFpbC5jb20iLCJuYW1lIjoiRmVybmFuZG8gSGVycmVyYSIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxNzE2MjQ5MDIyfQ.EIetGFQMJ2MZ-5Qe8UCRtga8FYQL1h-YXGC8qpa9Vug";
    
    
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {id_token} )
    } )
        .then(resp => resp.json() )
        .then( ( {token} ) => localStorage.setItem("token", token) )
        .catch(console.log)
}

function onOSignIn() {

}