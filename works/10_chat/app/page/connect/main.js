'use strict'
const {remote} = require('electron');
document.getElementById("btnConnect").addEventListener("click", (e) => {
    const ip = document.getElementById("ip").value;
    if (ip !== "") {
        location.href = `../chat/index.html?ip=${ip}`;
    }
});
