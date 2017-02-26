var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'ouwxc.cevwncmpvhyl.us-west-2.rds.amazonaws.com',
    user     : 'cs4560',
    password : 'teamonacob',
    database : 'PPA'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
