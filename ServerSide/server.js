const express = require('express')
const app = express()

/*
 * descp :  CORS is a node.js package for providing a Connect/Express middleware 
 * that can be used to enable CORS with various options To enable Cross Origin Resource 
 * Sharing CORS.
 */
const cors = require('cors')
app.use(cors())



/** This module loads environment variables from a .env file that you create and
 *  adds them to the process.env object that is made available to the application.
 *  */

const dotenv = require('dotenv')
dotenv.config()

/** body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
 *  This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request
 */
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Express-validator is a middleware for Express on Node.js that can help you validate user input.
var validators = require('express-validator')
app.use(validators())

var userRouter = require('./router/userRouter')
var noteRouter = require('./router/noteRouter')
var labelRouter = require('./router/labelRouter')
app.use('/', userRouter)
app.use('/', noteRouter)
app.use('/', labelRouter)
//app.get('/', function (req, res) {    
// res.send('Hello World ,how are you..?????')
//})

app.listen(process.env.PORT, () => {
  console.log("server port 3000 is connected")
})

var url = require('./config/dbConfiguration')

//Creates a connection to a MongoDB instance
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(url.url, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => {
    console.log("successfully connected to data base")

  }).catch((err) => {
    console.log("could not connected to the data base", err)
    process.exit()
  })


var redis = require('redis');
var client = redis.createClient();

client.on('connect', function () {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

module.exports = app