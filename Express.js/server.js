
const express = require('express')
const app = express()
const path  = require('path');
const logEvent = require('./middleware/logEvent');

const {logger} = require("./middleware/logEvent")
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");



const PORT = process.env.PORT || 3500;

app.use(logger);

// Built in middleware to handle urlencoded data :
// content-type: application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: false}));

// built-in middleware for json data//
app.use(express.json());

// Server static files//

app.use(express.static("./public")); 

const whitelist = ["https://www.abdullsite.com", "http://127.0.0.1:3000", 'http://localhost:3500']
corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else {
            callback(new Error("Not allow by CORS"))
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))


// To request from the home page

app.get('^/$|index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('^/$|new-page(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page.html', (req, res) => {
    res.redirect(301, path.join(__dirname, 'views', 'new-page.html'))
})

// Catch all routes to get error 404 page

app.all("/*", (req, res) => {
    res.status(404)
    if(req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));

    }else if(req.accepts("json")) {
        res.json({Error: "404 Not Found"});
    }else {
        res.type("txt").send('404 Not Found');
    }
});



app.get(
    '/', (req, res, next) => {
    console.log("attempted a request");
    next();    
},
(err, res, next) => {
    console.log("2nd request attempted");
    next();
},
(req, res) => {
    console.log("Final request");
    res.send("Hello world");
}
);


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


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server listening ${PORT}`)
});


