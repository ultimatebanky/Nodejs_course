let availableUber = true;
const clientMakeOrder = true;

const uberReady = () => {
    if(availableUber && clientMakeOrder) console.log("Uber is ready to move");
    else console.log("Uber is not ready to move");
};
const fuelMinLimit = 50;
const fuelMaxLimit = 250;

const fuelLimit = (minError, maxError) => {
    if (fuelMinLimit <= 50) return maxError;
    else if (fuelMaxLimit  >= 250) return minError;
    else console.log("Fuel limitation is cool, we can ride on");
}

module.exports = {uberReady, fuelLimit};