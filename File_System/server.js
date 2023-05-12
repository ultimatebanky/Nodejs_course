const fs = require("fs");
const path = require("path");


// hardcode method
// fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
//     if(err) throw err
//     // console.log(data.toString())
//     console.log(data)
// })

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if(err) throw err
    // console.log(data.toString())
    // console.log(data)
})

fs.writeFile(path.join(__dirname, 'files', 'new.txt'), 'Hello na me write you', (err) => {
    if(err) throw err
    // console.log(data.toString())
    console.log('Write file completed');


    fs.appendFile(path.join(__dirname, 'files', 'new.txt'), '\n\n I have been updated - apricapenda', (err) => {
        if(err) throw err
    // console.log(data.toString())
    console.log('file update completed');

    })
})

    fs.rename
        (path.join(__dirname, 'files', 'new.txt'),
        path.join(__dirname, 'files', 'final.txt'),
        (err) => {
        if(err) throw err;
        console.log('Rename completed');
    }
);

fs.appendFile
    (path.join(__dirname, 'files', 'index.js'),"console.log('Hello')",
    (err) => {
    if(err) throw err;
    console.log('Updating to completed');
 }

 
);

fs.unlink(path.join(__dirname, 'files', 'index.js'),
    (err) => {
    if(err) throw err;
    console.log('FILE DELETED');
 }
);


    process.on('uncaughtException', (err) => {
    console.error(`'There was an error processing the data:' ${err}`)
    process.exit(1)
});