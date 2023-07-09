const users = []
function newUser(id, username, room)
{
    const colors = ['FFA07A', 'FF7F50', 'FF6347', 'FF4500', 'FF8C00', 'FFA500' ];
    const randomColor =   colors[Math.floor(Math.random()*colors.length)];
    const user = {id, username, room,randomColor };
    users.push(user);
    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
  }

  
function checkIfUsernameExists(username, room) {
    return users.findIndex(user => user.username === username && user.room === room );
  }


function findRoomParticipate(room)
{
    return users.filter(user => user.room === room);
}

function removeUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}  


module.exports ={
    newUser,
    findRoomParticipate, 
    getCurrentUser, 
    removeUser,
    checkIfUsernameExists
};