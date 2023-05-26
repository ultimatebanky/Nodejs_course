const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

const {logger} = require('./middleware/logEvent')
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 8500

app.use(logger)

// syntax for creating custom middleware

// app.use((req, res, next) => {
//       console.log(`${req.method}\n${req.path}`)
//       logEvents(`${req.method}\t${req.path}\t${req.headers.origin}`, 'reqLog.txt')
//       next()
// })

//built in middleware to handle url encoded data :
// Content-type application/x-www-form-urlencoded

app.use(express.urlencoded({extended: false}))

// built-in middleware for json data

app.use(express.json());

//server static files

app.use(express.static(path.join(__dirname,'./Public')));
// app.use('/subdir', express.static(path.join(__dirname,'./Public')));

// 
app.use('/subdir', require('./route/root'));
app.use('/students', require('./route/api/students'));
app.use("/register",  require('./route/register'));
app.use(cors(corsOptions));
app.use("/auth", require("./route/auth"));



// catch all routes to get error 404 page

app.all('*',(req, res) => {
      res.status(404);
      if(req.accepts('html')){
      res.sendFile(path.join(__dirname, 'views', '404.html'));
      }else if (req.accepts('json')){
        res.join({Error: '404 Not Found'});
      }else{
            res.type('txt').send('404 Not Found');
      }
      
      // res.status(404)

})

app.get('/', (req, res, next) => {
      console.log('attempted a request');
      next()
}, (err, res, next) => {
      console.log ('second request attempted')
      next()
}, (req, res) => {
      console.log('final request')
      res.send('hello world')
})

// const a = (req, res, next) => {
//       console.log('attempted a request');
//       next()
// }

// const b =(err, res, next) => {
//       console.log ('second request attempted')
//       next()
// }
// const c = (req, res) => {
//       console.log('final request')
//       res.send('hello world')
// }

//       app.get('/', [a,b,c])
      

app.use(errorHandler)

app.listen(PORT, () => console.log(`server is listening on ${PORT}`))


