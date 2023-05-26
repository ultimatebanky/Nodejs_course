const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5000;

app.use(logger);

app.use(express.urlencoded({ extended: false }));

// buit-in middleware for json data
app.use(express.json());
app.use(cookieParser())

// serve static files
app.use("/", express.static(path.join(__dirname, "./public")));
// app.use('/subdir',express.static(path.join(__dirname, './public')))

// routes
app.use("/", require("./routes/root"));
// app.use('/subdir', require('./routes/subdir'))

// register api routes

app.use("/register", require("./routes/register"));

// auth api routes
app.use("/auth", require("./routes/auth"));

// refresh token api routes

app.use("/refresh", require("./routes/refresh"));

// logout token api routes
app.use("/logout", require ("./routes/logout"))

// version api routes
app.use(verifyJWT)

// students api  routes
app.use("/students", require("./routes/api/students"));

app.use(cors(corsOptions));


// how to get request
app.get("^/$|index(.html)?", (req, res) => {
  //res.sendFile('./views/index.html', {root: __dirname})
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("^/$|new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// to redirect

app.get("/old-page(.html)?", (req, res) => {
  // res.redirect(path.join(__dirname, 'views', 'new-page.html')) // 302 by default
  res.redirect(301, "/new-page.html");
});

// catch all route to get error 404 page
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.join({ Error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Method 2

app.get(
  "/",
  (req, res, next) => {
    console.log("attempted a request");
  },
  (err, res, next) => {
    console.log("attempted a request 2");
    next();
  },
  (req, res) => {
    console.log("Final request");
    res.send("Hello World");
  }
);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

// // Creating Server
// const http = require('http')
// const host = 'localhost'
// const port = '9111'

// const requestListner = function(req, res) {
//     res.writeHead(200)
//     res.end('My first server!')
// }

// // Creating A Server

// const server = http.createServer(requestListner);
// server.listen(port, host, () => {
//     console.log(`Server Listening on port http://${port} : ${host}`)
// })
