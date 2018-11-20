var mongoose = require("mongoose");
var profileSchema = mongoose.Schema({
  userId: String,
  surname: String,
  name: String,
  patronymic: String,
  phoneNumber: String,
  mail: String
});
profileSchema.methods.getSurname = function(){
	if (this.surname){
		return this.surname;
	}
	return "не указано";
}
profileSchema.methods.getName = function(){
	if (this.name){
		return this.name;
	}
	return "не указано";
}
profileSchema.methods.getPatronymic = function(){
	if (this.patronymic) {
		return this.patronymic;
	}
	return "не указано";
}
profileSchema.methods.getPhoneNumber = function(){
	if (this.phoneNumber){
		return this.phoneNumber;
	}
	return "не указано";
}
profileSchema.methods.getMail = function(){
	if (this.mail){
		return this.mail;
	}
	return "не указано";
}

var Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;