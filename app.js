var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var router = express.Router();
var router = require('./router/index');

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(port, function(){
  console.log(`JUST TO DO'S SERVER STARTED ! with ${port} port`);
});
