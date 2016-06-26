'use strict'
const http = require('http');
const server = http.createServer().listen(8080);
const io = require("socket.io").listen(server);
console.log('Server is running!');

io.sockets.on("connection", (socket) => {
    socket.on("disconnect", () => {
    });
});
