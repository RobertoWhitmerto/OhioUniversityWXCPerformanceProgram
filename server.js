var express = require('express');
var path = require("path");
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/site.htm'));
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post("/", function(req, res){
  console.log(req.body.user)
  console.log(req.body.pass)
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
