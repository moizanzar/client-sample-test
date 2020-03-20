/**
 * Module dependencies.
 */
let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let server = express();
let model = require("./model");
let cors = require('cors');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(methodOverride())

server.use(cors());
server.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Expose-Headers', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

let productController = require('./controller/product.controller')

//------- PRODUCT CRUD OPERATIONS ---------------
server.use('/api/product', productController);

server.use(logErrors)
server.use(clientErrorHandler)
server.use(errorHandler)

const port = process.env.APP_PORT;

server = http.createServer(server);
model.sequelize.sync().then(function () {
    server.listen(port, () => console.log(`Running on port: ${port}`));
    server.on('error', (err)=>{ console.log("Error: "+ err) } );
  });

//Error logging
function logErrors (err, req, res, next) {
  // log error msg and stack in a file, database or any other thing
  next(err)
}

//Client Error Handler
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

//catch all errors
function errorHandler (err, req, res, next) {
  res.status(500).json({
    status: "Fail",
    msg: "[Error] " + err,
  });
}
