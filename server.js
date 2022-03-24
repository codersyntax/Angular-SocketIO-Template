var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
    socket.on("userSubmittedPlayerName", async (character) => {
        console.log(new Date().toLocaleTimeString() + " : " + character.Name + " logged in...");
        character.SocketId = socket.id;
        if(characters.includes(character))
        {
            //Check login details
        }
        else {
            characters.push(character);
        }
        io.emit("updateCharacterConnectionString", socket.id);
        io.emit("currentOnlineCharacters", characters);
    });
    socket.on("disconnect", () => {
        var loggedOutCharacter = characters.filter(i => i.SocketId == socket.id);
        if(loggedOutCharacter.length == 1) {
            console.log(loggedOutCharacter[0].Name + " logging out...");
        }
        characters = characters.filter(i => i.SocketId != socket.id);
        console.log("Remaining players online: " + characters.length);
        io.emit("currentOnlineCharacters", characters);
    })
});

http.listen(5000, () => {
    console.log('Server starting up.... App listening on PORT 5000.');
});

//TODO Persist character data somewhere
var characters = [];