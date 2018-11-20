var mongoose = require("mongoose");
var availableServiceSchema = mongoose.Schema({
  serviceId: String,
  userId: String,
  date: Date,
  time: String,
  available: Boolean
});
availableServiceSchema.methods.getId = function(){
	return this._id.toString();
}

availableServiceSchema.methods.getServiceId = function(){
	return this.serviceId;
}
availableServiceSchema.methods.getUserId = function(){
	return this.userId;
}
availableServiceSchema.methods.getDate = function(){
	return this.date;
}
availableServiceSchema.methods.getTime = function(){
	return this.time;
}
availableServiceSchema.methods.isAvailable = function(){
	return this.available;
}


var availableService = mongoose.model("availableService", availableServiceSchema);
module.exports = availableService;