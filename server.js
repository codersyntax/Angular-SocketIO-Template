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
        console.log(loggedOutCharacter[0].Name + " logging out...");
        characters = characters.filter(i => i.SocketId != socket.id);
        console.log(characters);
        io.emit("currentOnlineCharacters", characters);
    })
});

http.listen(5000, () => {
    console.log('App listening....');
});

//TODO Persist character data somewhere
var characters = [];