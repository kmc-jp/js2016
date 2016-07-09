'use strict'

const {app, BrowserWindow} = require('electron');

let mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Electronの初期化完了後に実行
app.on('ready', () => {
    // メイン画面の表示
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(`file://${__dirname}/page/index.html`);

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
