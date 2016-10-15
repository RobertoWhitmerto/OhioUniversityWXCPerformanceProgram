module.exports = function(app) {
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/site.htm');
});

app.get('/signin', function(request, response) {
  response.sendFile(__dirname + '/signin.html');
});

app.get('/workoutentry', function(request, response) {
  response.sendFile(__dirname + '/workoutentry.htm');
});
}