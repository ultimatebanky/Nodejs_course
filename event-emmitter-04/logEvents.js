const {v4: uuid }  = require("uuid");
const { format } = require("date-fns");

const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

// log events
const logEvents = async () => {
    const message = "This is my time"
    const dateTime = format(new Date(), "yyy-MM-dd\t\tHH:mm:ss");
    const logItems = `${dateTime} \t ${uuid()} \t ${message}\n`;
    // console.log(logItems);

//  To have a file in the folder//

    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            fs.mkdir(path.join(__dirname, 'logs'), (err) => {
                if (err) throw err
            })
        }
        await fsPromises.writeFile(path.join(__dirname, 'logs', 'eventLogs'), logItems)
    } catch (error) {
     console.log(error)   
    }

};

module.exports = logEvents;