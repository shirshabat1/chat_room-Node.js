const moment = require('moment');
function serverMessage(randomColor,username,  message)
{
    // const newmessage= {time: `${moment().format('h:mm a')}` ,message: `${message}` }
    return {randomColor, username, message, time: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`}
}


module.exports  ={serverMessage};