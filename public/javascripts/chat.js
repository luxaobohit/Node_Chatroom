/*
 <p>client-side</p>:
 <ul>
 <li>determine whether user input is a message or a chat command</li>
 <li>process chat commands and send information to the server</li>
 </ul>
 */

var Chat = function (socket) {
    this.socket = socket;
};

Chat.prototype.sendMessage = function (room, text) {
    var message = {
        room: room,
        text: text
    };
    this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function (room) {
    this.socket.emit('join', {
        newRoom: room
    });
};

Chat.prototype.processCommand = function (cmd) {
    var words = cmd.split(' ');
    var command = words[0]
        .substring(1, words[0].length)
        .toLowerCase();
    var message = false;
    switch (command) {
        case 'join':
            words.shift();
            var room = words.join(' ');
            this.changeRoom(room);
            break;
        case 'nick':
            words.shift();
            var name = words.join(' ');
            this.socket.emit('nameAttempt', name);
            break;
        default:
            message = 'Unrecognized command.';
            break;
    }
    return message;
};

