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
        console.log("\x1b[37m", new Date().toLocaleTimeString() + " : " + character.Name + " logged in...");
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
        console.log("\x1b[37m", "Current players online: " + characters.length);
    });

    socket.on("chatMessage", (message) => {
        console.log('\x1b[36m%s\x1b[0m', " " + message);
        io.emit("postChatMessage", " " + message);
    })

    socket.on("GetMarketData", () => {
        io.emit("UpdateMarket", JSON.stringify(market));
    })

    socket.on("AddMarketItem", (marketItem) => {
        var marketItemObj = JSON.parse(marketItem);
        console.log('\x1b[35m%s\x1b[0m', " " + new Date().toLocaleTimeString() + " : " + marketItemObj.ListingOwner.Name + " added (" + marketItemObj.Count + ") " + marketItemObj.Item.Name + " for " + marketItemObj.Price + " on the market ");
        market.push(marketItemObj);
        io.emit("UpdateMarket", JSON.stringify(market));
    });

    socket.on("disconnect", () => {
        var loggedOutCharacter = characters.filter(i => i.SocketId == socket.id);
        if(loggedOutCharacter.length == 1) {
            console.log('\x1b[37m%s\x1b[0m', " " + new Date().toLocaleTimeString() + " : " + loggedOutCharacter[0].Name + " logging out...");
        }
        characters = characters.filter(i => i.SocketId != socket.id);
        io.emit("currentOnlineCharacters", characters);
    })
});

http.listen(5000, () => {
    console.clear();
    console.log("\x1b[31m", 'Server starting up.... App listening on PORT 5000.\n');
});

//TODO Persist character data somewhere
var characters = [];
//TODO Persist market data somewhere
var market = [];