var mongoose = require("mongoose");
var recordSchema = mongoose.Schema({
  userId: String,
  date: Date, 
  service: String,
});
recordSchema.methods.getUserId = function(){
	return this.userId;
}
recordSchema.methods.getDate = function(){
	return this.date;
}
recordSchema.methods.getService = function(){
	return this.service;
}


var Record = mongoose.model("Record", recordSchema);
module.exports = Record;