const logEvents = require('./logEmitter')
const { EventEmitter } = require("node:events");

// initialize event object
const myEmitter = new EventEmitter();
myEmitter.on("log", (msg) => logEvents (msg));

// console.log(myEmitter.listeners)("log");
setTimeout(() => {
    myEmitter.emit("log", "emitted");

}, 3000);