const query = new URLSearchParams(window.location.search);


if (!query.has('user-name') || !query.has('room') ) {
    window.location = 'index.html';
    
    
    throw new Error('El nombre y sala son necesarios');
}



// jQuery stuff
const usersDiv = $("#usersDiv");
const chatBoxDiv = $("#chatBoxDiv");
const sendMsgTxt = $("#sendMsgTxt");
const sendMsgForm = $("#sendMsgForm");



const getLoggedUser = () => {
    return {
        name: query.get('user-name'),
        room: query.get('room')
    };
}


const renderUsers = (users) => {
    let iHTML = `<li>
                     <a class="active" href="javascript:void(0)"> Chat de <span> ${users[0].room} </span> </a>
                 </li>`;


    for (let i = 0; i < users.length; i++) {
        iHTML += `<li>
                      <a data-id="${users[i].id}" href="javascript:void(0)">
                          <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> 
                          <span> ${users[i].name} <small class="text-success"> Online </small> </span>
                      </a>
                  </li>`;
    }
    
    
    usersDiv.html(iHTML);
}

const renderMsg = (msg) => {
    let iHTML = '';

    iHTML += `<li class="animated fadeIn">
                  <div class="chat-img">
                      <img src="assets/images/users/1.jpg" alt="user"/>
                  </div>
          
                  <div class="chat-content">
                      <h5> ${msg.user} </h5>
                      
                      <div class="box bg-light-info">
                          ${msg.msg}
                      </div>
                  </div>
          
                  <div class="chat-time">
                      ${msg.date}
                  </div>
              </li>`


    chatBoxDiv.append(iHTML);
}

const renderOwnMsg = (msg) => {
    let iHTML = '';

    iHTML += `<li class="reverse animated fadeIn">
                  <div class="chat-content">
                      <h5> ${msg.user} </h5>
                      
                      <div class="box bg-light-inverse">
                          ${msg.msg}
                      </div>
                  </div>
  
                  <div class="chat-img">
                      <img src="assets/images/users/5.jpg" alt="user"/>
                  </div>
  
                  <div class="chat-time">
                      ${msg.date}
                  </div>
              </li>`


    chatBoxDiv.append(iHTML);
}

const renderAdminMsg = (msg, success) => {
    let iHTML = '';
    let classHTML = '';


    if(success) {
        classHTML = "box bg-light-success";
    } else {
        classHTML = "box bg-light-danger";
    }


    iHTML += `<li class="animated fadeIn">         
                  <div class="chat-content">
                      <h5> ${msg.user} </h5>
                      
                      <div class="${classHTML}">
                          ${msg.msg}
                      </div>
                  </div>
              </li>`


    chatBoxDiv.append(iHTML);
}



usersDiv.on("click", 'a', function() {
    const id = $(this).data("id");


    if(id) {
        console.log(id);
    }
} );

sendMsgForm.on("submit", function (event) {
    event.preventDefault();


    if(sendMsgTxt.val().trim().length === 0)
        return;


    socket.emit("bcast-msg", {
        msg: sendMsgTxt.val()
    }, (rMsg) => {
        renderOwnMsg(rMsg);
        scrollBottom();
    }  );

    sendMsgTxt.val('').focus();
} );



const scrollBottom = () => {
    const scrollTop = chatBoxDiv.prop('scrollTop');
    const newMessage = chatBoxDiv.children('li:last-child');
    const clientHeight = chatBoxDiv.prop('clientHeight');
    const scrollHeight = chatBoxDiv.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        chatBoxDiv.scrollTop(scrollHeight);
    }
}