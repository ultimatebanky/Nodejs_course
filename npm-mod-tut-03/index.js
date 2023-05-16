const { format } = require("date-fns");
const uuid = require("uuid");

const dateTime = format(new Date(), 'yyy-MM-dd\thh:mm:ss')
console.log(dateTime);
console.log(uuid.v4());