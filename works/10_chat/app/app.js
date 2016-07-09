'use strict'

const http = require('http');
const server = http.createServer().listen(8000);
const io = require("socket.io").listen(server);
console.log('Server is running!');
io.sockets.on("connection", (socket) => {
    console.log(`connected: ${socket.id}`);
    io.sockets.emit("addLog", `${socket.id}が入室しました`);
    socket.on("say", (mes) => {
        io.sockets.emit("addLog", `${socket.id}: ${mes}`);
    });
    socket.on("disconnect", () => {
        io.sockets.emit("addLog", `${socket.id}が退室しました`);
    });
});

const {app, dialog, BrowserWindow, Menu, MenuItem, Tray, ipcMain} = require('electron'); // 変更

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

const createWindow = (page) => {
    let win = new BrowserWindow({ width: 600, height: 400 });
    win.loadURL(`file://${__dirname}/page/${page}`);
    // メニューを設定
    win.setMenu(Menu.buildFromTemplate([
        { label: "接続", click: () => { createWindow("connect/index.html"); }},
        { label: "開発者ツール", accelerator: 'Ctrl+Shift+I',
          click: () => { win.toggleDevTools(); } },
        { label: "終了", role: "close" },
    ]));
    return win;
};

app.on('ready', () => {
    // メイン画面の表示
    let mainWindow = createWindow("chat/index.html?ip=http://localhost:8000/");
    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', () => {
        app.quit();
    });
});
