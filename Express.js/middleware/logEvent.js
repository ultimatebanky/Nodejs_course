// Third party module
const {format} = require('date-fns')
const {v4: uuid} = require('uuid')

// core module
const fsPromises = require('fs/promises')
const fs = require('fs')
const path = require('path')

const logEvent = async (message, logName) => {
    const dateTime = format(new Date(), 'yyyy-mm-dd\t\tHH:mm:ss');
    const logItems = `${dateTime}\t ${uuid()}\t${message}\n`
    // console.log(logItems)

    try {
        if(!fs.existsSync(path.join(__dirname, "..", 'directory'))) {
            await fsPromises.mkdir(path.join(__dirname, "..", 'directory'), (err) => {
                if (err) throw err;
                console.log("directory created successfully")
            })

        }else console.log('IDAN don dey already')
        await fsPromises.appendFile(path.join(
            __dirname, "..", 'directory', logName ), logItems);

    } catch (error) {
        console.log(error);
    }
}  


const logger = (req, res, next) => {
    console.log(`${req.method}\n${req.path}`);
    logEvent(`${req.method}\t${req.path}\t${req.headers.origin}`, "reqlog.txt");
    next();
}

module.exports = { logEvent, logger };
