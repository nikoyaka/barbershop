/*var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;
var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  displayName: String,
  bio: String,
});


userSchema.methods.name = function() {
  return this.displayName || this.username;
};
var User = mongoose.model("User", userSchema);
module.exports = User;

*/

var mongoose = require("mongoose");

var serviceSchema = mongoose.Schema({
	serviceName: {type: String, required: true, unique: true},
	type: String,
	price: {type: String, required: true},
	duration: String,
	imgsrc: String
});

serviceSchema.methods.getName = function(){
	return this.serviceName;
}
serviceSchema.methods.getDuration = function(){
	return this.duration;
}
serviceSchema.methods.getPrice = function(){
	return this.price;
}
serviceSchema.methods.getImg = function(){

	return this.imgsrc;
}

var Service = mongoose.model("Service", serviceSchema);
module.exports = Service;

