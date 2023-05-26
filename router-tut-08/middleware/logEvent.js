// Third party module
const {format} = require('date-fns')
const {v4: uuid} = require('uuid')

// core module
const fsPromises = require('fs/promises')
const fs = require('fs')
const path = require('path')

const logEvent = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyy-mm-dd\t\tHH:mm:ss');
    const logItems = `${dateTime}\t ${uuid()}\t${message}\n`
    

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'directory'))) {
            fs.mkdir(path.join(__dirname, '..', 'directory'), (err) => {
                if (err) throw err;
                // console.log("directory created successfully")
            })
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'directory', logFileName ), logItems)

    } catch (error) {
        console.log(error)
    }
}   


const logger = (req, res, next) => {
    console.log(`${req.method}\n${req.path}`)
    logEvent(`${req.method}\t${req.path}\t${req.headers.origin}`, 'reqLog.txt')
    next()
}
module.exports = {logEvent, logger}
