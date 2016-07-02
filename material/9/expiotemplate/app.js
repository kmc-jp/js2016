'use strict'
// 準備
const http = require('http');
const path = require('path');
const express = require('express');
const port = process.env.NODE_PORT || 8000;
const ipaddr = process.env.NODE_IP || 'localhost';
const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
const server = http.createServer(app).listen(port, ipaddr);
const io = require("socket.io").listen(server);
console.log('Server is running!');

// メイン処理
io.sockets.on("connection", (socket) => {
    console.log(`Connected!!     id:${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`Disconnected!!  id:${socket.id}`);
    });
});
