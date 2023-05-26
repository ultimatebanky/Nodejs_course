


const express = require('express')
const app = express()
const path  = require('path');

const PORT = process.env.PORT || 3500

// To request from the home page

// app.get('^/$|index(.html)?', (req, res) => {
//     // res.sendFile('./views/index.html', {root: __dirname})
//     res.sendFile(path.join(__dirname, 'views', 'index.html'))
// })

// app.get('^/$|new-page(.html)?', (req, res) => {
//     // res.sendFile('./views/index.html', {root: __dirname})
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
// })

// app.get('/old-page.html', (req, res) => {
//     res.redirect(301, path.join(__dirname, 'views', 'new-page.html'))
// })

// // Catch all routes to get error 404 page

// app.get("/*", (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });



// app.get(
//     '/', (req, res, next) => {
//     console.log("attempted a request");
//     next();    
// },
// (err, res, next) => {
//     console.log("2nd request attempted");
//     next();
// },
// (req, res) => {
//     console.log("Final request");
//     res.send("Hello world");
// }
// );


// Application level middleware//

const One = (req, res, next) => {
    console.log("1st request attempted");
    next();
};

const Two = (req, res, next) => {
    console.log("2nd request attempted");
    next();
};

const Three = (req, res) => {
    console.log("Final Request");
    res.send("Finished Request");
};

const Requests= [One, Two, Three];
// console.log(Requests[2]);
app.get ("/", Requests);

app.listen(PORT, () => {
    console.log(`server listening ${PORT}`)
});


