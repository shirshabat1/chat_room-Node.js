// client side
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const chatMessages = document.querySelector('.direct-chat-messages');
const chatForm = document.getElementById('box-footer');

const { username, room } =  Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
const socket = io();
socket.emit('joinRoom', { username, room });
socket.on('redirect', function(destination) {
  window.location.href = destination;
});
socket.on('roomUsers' , ({room, participates})=>
{
  // console.log('roomUsers')
  outputRoomName(room);
  outputUsers(participates);
});


socket.on('message', (body)=>
{
  // console.log(`body: ${body}`)
  outputMessage(body)
  chatMessages.scrollTop = chatMessages.scrollHeight;

});


// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  names = [];
  users.forEach((user)=>
  {
    names.push(user.username);
  })
  userList.innerHTML =  `${names.toString()}`;
};


function outputMessage(body) {
  const username = body.username;
  const time = body.time;
  const message = body.message;
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const span = document.createElement('span');
  const span1 = document.createElement('span');
  div1.classList.add('direct-chat-info');
  div2.classList.add('direct-chat-text');
  span.classList.add('direct-chat-name');
  span.innerText = username;
  span.style = `color: ${body.randomColor}`;
  span1.classList.add("direct-chat-timestamp");
  span1.innerText = `    ${time}`;
  div1.appendChild(span);
  div1.appendChild(span1);
  div2.innerText = message;
  document.querySelector('.direct-chat-msg').appendChild(div1);
  document.querySelector('.direct-chat-msg').appendChild(div1);
  document.querySelector('.direct-chat-msg').appendChild(div2);

}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get message text
  let msg = e.target.elements.msg.value;
 
  msg = msg.trim();
  // Get message text

  console.log(`msg ${msg}`)

  console.log(msg)
  if (!msg) {
    return false;
  }  // // Emit message to server
  socket.emit('chatMessage', msg);
 console.log('chat!')
  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});
 


