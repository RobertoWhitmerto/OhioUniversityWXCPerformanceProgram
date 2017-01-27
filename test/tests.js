var request = require('supertest');
var server = request.agent('http://localhost:5000');

describe('login attempt', function(done){
	it('admin successfully login', adminLoginUser("admin", "teamonacob"));
	it('admin failed login', loginUserFail("admin", "notmypw"));
	it('athelete successfuly login', athleteLoginUser("BillNye", "TheScienceGuy"));
	it('athelete failed login', loginUserFail("BillNye", "notBill'spw"));
});


function adminLoginUser(user, pass){
	return function(done){
		server
			.post('/')
			.send({username: user, password: pass})
			.expect(302)
			.expect('Location', '/coaches')
			.end(onResponse);
		function onResponse(err,res){
			if(err) return done(err);
			return done();
		}
	};
};

function loginUserFail(user, pass){
	return function(done){
		server
			.post('/')
			.send({username: user, password: pass})
			.expect(302)
			.expect('Location', '/')
			.end(onResponse);
		function onResponse(err,res){
			if(err) return done(err);
			return done();
		}
	};
};


function athleteLoginUser(user, pass){
	return function(done){
		server
			.post('/')
			.send({username: user, password: pass})
			.expect(302)
			.expect('Location', '/workoutentry')
			.end(onResponse);
		function onResponse(err,res){
			if(err) return done(err);
			return done();
		}
	};
};

