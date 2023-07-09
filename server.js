const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const url = require('url');
const querystring = require('querystring');
var alert = require('alert');
const app= express();
app.use(express.static(path.join(__dirname, "public")));
const server = http.createServer(app);
const io = socketio(server);
const {newUser, findRoomParticipate, getCurrentUser, removeUser, checkIfUsernameExists} = require('./utils/user');
const {serverMessage} = require('./utils/server_message');

io.on('connection', (socket) =>
{
    socket.on("joinRoom", ({username, room})=> {
        if (checkIfUsernameExists(username, room) > -1)
        {
           alert(`Username already exists in that room`);
            socket.emit('redirect', '/index.html');
        }
        else
        {
            const user= newUser(socket.id, username, room);
            socket.join(user.room);
            socket.emit("message", serverMessage(user.randomColor, user.username,   `Welcome to room number: ${user.room}`));
            socket.broadcast.to(user.room).emit("message", serverMessage(user.randomColor, user.username,   `${user.username}  entered this room`)); //send to everyone except the sender.
            participates = findRoomParticipate(user.room);
            io.to(user.room).emit("roomUsers", {room: user.room, participates});
        }
    });
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        room = user.room;
        io.to(user.room).emit("message", serverMessage(user.randomColor , user.username, msg));
      });

      socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", serverMessage(user.randomColor, user.username, `${user.username} had left the room`));
            participates = findRoomParticipate(user.room);
            io.to(user.room).emit("roomUsers", {room: user.room, participates});
        }
    })
});


const port = 3000;
server.listen(port, ()=> {
    console.log("App is listing on port 3000");
});