var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'ohioperformance.cwiki2unmymf.us-west-2.rds.amazonaws.com',
    user     : process.env.username,
    password : process.env.password,
    database : 'OhioPerformanceProgram'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
