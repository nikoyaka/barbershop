var passport = require("passport");

var User = require("./models/user");

var LocalStartegy = require('passport-local').Strategy;

passport.use("login", new LocalStartegy((username, password, done) => {
	User.findOne({username: username}, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user){
			return done(null, false, {message: "No user has that username!!!"});
		}
		user.checkPassword(password, (err, isMatch) => {
			if (err){
				return done(err);
			}
			if (isMatch){
				return done(null, user);
			} else {
				return done(null, false, {message: "Invalid password"});
			}
		});
	});
}));

module.exports = () => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
}