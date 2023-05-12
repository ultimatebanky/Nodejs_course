const fs = require('fs')
const path = require('path')

// creating a folder inside file
if(!fs.existsSync(path.join(__dirname, 'files', 'directory'))) {
    fs.mkdir(path.join(__dirname, 'files', 'directory'), (err) => {
        if (err) throw err;
        console.log("Directory created succesfully")
    })
}else console.log('You dey whine?? Directory dey already')


// if(!fs.existsSync(path.join(__dirname, 'files', 'folder'))) {
//     fs.mkdir(path.join(__dirname, 'files', 'folder'), (err) => {
//         if (err) throw err;
//         console.log("Directory created succesfully")
//     })
// }else console.log('Directory deleted!')