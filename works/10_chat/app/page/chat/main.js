'use strict'
const {remote, ipcRenderer} = require('electron');
const connect = (ip) => {
    if ( !ip.match(/^(.*):\/\//) ) {
        ip = "http://" + ip;
    }
    const socketio = io.connect(`${ip}`);
    socketio.on("addLog", (mes) => {
        const p = document.createElement("p");
        p.textContent = mes;
        document.getElementById("log").appendChild(p);
    });
    document.getElementById("btnSay").addEventListener("click", () => {
        const emes = document.getElementById("mes");
        if (emes.value !== "") {
            socketio.emit("say", emes.value);
        }
        emes.value = "";
    });
};
connect( location.href.match(/\?ip=(.*)/)[1] );
