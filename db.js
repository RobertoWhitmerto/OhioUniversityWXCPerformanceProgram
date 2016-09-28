var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'ouwxcpp.cztwbv1akcso.us-west-2.rds.amazonaws.com',
    user     : 'cs4560',
    password : 'teamonacob',
    database : 'ouwxcpp_db'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;