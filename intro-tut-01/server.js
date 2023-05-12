// console.log("hello Node");
// console.log(global);

//  How node differ from Vanilla js
//  i) Node runs on server and not the browser


// const os = require('os');
// const { parse } = require('path');

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// const path = require('path');

// console.log(path.dirname(__dirname));
// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));



const math = require("./math");
const Uber = require("./Uber");

const add = math.add(50, 30);
console.log(add);

const multiply = math.multiply(50, 30);
console.log(multiply)

const division = math.division(50, 30);
console.log(division)

const sub = math.sub (50, 30);
console.log(sub)

Uber.uberReady();
Uber.fuelLimit("Hey, stop there! you have reached the min limit of your Fuel, Oya fuel up, Hey you want to over fill?")


// const Friction = physics.Friction(2, 5);
// const Relativity = physics.Relativity(4, 3);
// const Motion = physics.Motion(3, 2);
// const Electromagnetic = physics.Electromagnetic(5, 8);

// console.log(Friction, Relativity, Motion, Electromagnetic);

