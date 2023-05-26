// Third party module
const {format} = require('date-fns')
const {v4: uuid} = require('uuid')

// core module
const fsPromises = require('fs/promises')
const fs = require('fs')
const path = require('path')

const logEvent = async (message) => {
    const dateTime = format(new Date(), 'yyyy-mm-dd\t\tHH:mm:ss');
    const logItems = `${dateTime}\t ${uuid()}\t${message}`
    // console.log(logItems)

    try {
        if(!fs.existsSync(path.join(__dirname, 'directory'))) {
            fs.mkdir(path.join(__dirname, 'directory'), (err) => {
                if (err) throw err;
                console.log("directory created successfully")
            })
        }else console.log('IDAN don dey already')
        await fsPromises.writeFile(path.join(__dirname, 'directory', 'log.txt' ), logItems)

    } catch (error) {
        console.log(error)
    }
}   

module.exports = logEvent
