module.exports = function(app) {
app.get('/', function(request, response) {
  response.render('site.pug');
});

app.get('/home', function(request, response) {
  response.render('signin.pug');
});

app.get('/about', function(request, response) {
  response.render('about.pug');
});	
	
app.get('/workoutentry', function(request, response) {
  response.render('workoutentry.pug');
});

app.get('/myworkouts', function(request, response) {
	response.render('myworkouts.pug');
});

app.get('/admin_athlete_vis', function(request, response) {
	response.render('admin_athlete_vis.pug');
});

app.get('/admin_add_user', function(request, response) {
	response.render('admin_add_user.pug');
});

app.get('/admin_remove_user', function(request,response) {
	response.render('admin_remove_user.pug');
});

app.get('/admin_remove_user', function(request, response) {
	response.render('admin_remove_user.pug');
});

};
