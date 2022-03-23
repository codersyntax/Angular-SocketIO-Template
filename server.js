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
    socket.on("userSubmittedPlayerName", data => {
        console.log(new Date().toLocaleTimeString() + " : " + data + " attempting to log in...");
        io.emit("successful-transmission", data);
    });
});

http.listen(5000, () => {
    console.log('App listening....');
});