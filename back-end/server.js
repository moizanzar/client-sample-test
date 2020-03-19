/**
 * Module dependencies.
 */
let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let server = express();
let model = require("./model");
var cors = require('cors');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

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

//------- USER CRUD OPERATIONS ---------------
server.use('/api/product', productController);


server.use(function (err, req, res, next) {
  if (!err) 
    return next(); 

  console.log("An Error occurred while executing the query.");
  console.log("[Error] " + err);
  res.status(500).json({
    status: "Fail",
    msg: "[Error] " + err,
  });
});

const port = 5000;

server = http.createServer(server);
model.sequelize.sync().then(function () {
    server.listen(port, () => console.log(`Running on port: ${port}`));
    server.on('error', (err)=>{ console.log("Error: "+ err) } );
  });



process.on('uncaughtException', function (exception) {
  console.log(exception);
});
