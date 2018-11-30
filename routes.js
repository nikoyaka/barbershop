var express = require("express");
var User = require("./models/user");
var Service = require("./models/service");
var Profile = require("./models/profile");
var AvailableService = require("./models/availableService");
var router = express.Router();

var passport = require("passport");


router.use(function(req, res, next) {
  res.locals.currentUser = req.user;          
  res.locals.errors = req.flash("error");     
  res.locals.infos = req.flash("info");       
  next();
});

function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    next();
  } else {
    req.flash("info", "You must be logged in to see this page");
    res.redirect("/login");
  }
}


router.get("/", function(req, res, next) {
  User.find()                                 
  .sort({ createdAt: "descending" })          
  .exec(function(err, users) {                
    if (err) { return next(err); }
    res.render("index", { users: users });
  });
});


router.get("/signup", function(req, res) {
  res.render("signup");
});


router.post("/signup", function(req, res, next) {
  var username = req.body.username;                  
  var password = req.body.password;                  
  User.findOne({ username: username }, function(err, user) {   
    if (err) { return next(err); }
    if (user) {                                      
      req.flash("error", "User already exists");     
      return res.redirect("/");      
      //return res.redirect("/signup")          
    }                                                
    var newUser = new User({         
      username: username,            
      password: password             
    });   
    newUser.save(); 
    var newProfile = new Profile({
      userId: newUser._id,
      surname: "",
      name: "",
      patronymic: "",
      phoneNumber: "",
      mail: ""
    });     
    newProfile.save(next);                    
                          
  });
}, passport.authenticate("login", {   
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));


router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/",
  //failureRedirect: "/login"
  failureFlash: true
}));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


// topMenu

router.get("/service", (req, res) => {
  Service.find()        
  .exec(function(err, services) {                
    if (err) { return next(err); }
    res.render("service", { services: services });
  });  
})

router.get("/about", (req, res) => {
  res.render("aboutUs");
})

router.get("/contacts", (req, res) => {
  res.render("contacts");
})

router.get("/profile", ensureAuthenticated, (req, res) =>{
  Profile.findOne({userId: req.user._id.toString()})
  .exec((err, profile) => {
    if (err) {return next(err);}

    AvailableService.find({userId: req.user._id.toString(), date: {$gte: new Date()}})
    .sort({date: 1 })
    .exec( (err, userRecords) => {
        res.render("privateOffice", {profile: profile, records: userRecords})
    })    
  })  
})

router.post("/profile", (req, res) => {
  Profile.findOne({userId: req.user._id.toString()})
  .exec( (err, profile) => {

   profile.surname = req.body.surname;
   profile.name = req.body.name;
   profile.patronymic = req.body.patronymic;
   profile.phoneNumber = req.body.phoneNumber;
   profile.mail = req.body.mail;

    profile.save();
    res.send(profile);
});

})


router.get("/makeRecord", ensureAuthenticated, (req, res) =>{
  
  AvailableService.find({serviceId: req.query.service, available: true, date: {$gte: new Date()}})
  .sort({date: 1})
  .exec((err, services) => {

    let mapServices = function(services){
      return services.reduce( (countMap, elem) => {
        if (!countMap[elem.date]) countMap[elem.date] = [];
        countMap[elem.date].push(elem.time);
        return countMap;
      }, {})

    }(services);
    let servicesArr = [];
    for (_key in mapServices){
      key = new Date(_key);
      let day = key.getDate();
      let month = key.getMonth()+1;
      let year = key.getFullYear();
      let date = day+"."+month+"."+year;
      let newArrElem = [_key, date].concat(mapServices[key]);
      servicesArr.push(newArrElem);
    }
    res.render("makeRecord", {serviceName: req.query.service, services: servicesArr});
  }) 
})

router.post("/makeRecord", (req, res) => {
  let userId = req.user._id.toString();
  AvailableService.findOne({serviceId: req.body.serviceName, date: new Date(req.body.date), 
    time: req.body.time})
  .exec( (err, service) => {
    service.serviceId = req.body.serviceName;
    service.userId = userId;
    service.date = req.body.date;
    service.time = req.body.time;
    service.available = false;

    service.save();
    res.send("ok");
});
})


router.post("/cancelRecord", (req, res) => {

  AvailableService.findOne({_id: req.body.record})
  .exec( (err, record) => {
    record._id = req.body.record;
    record.serviceId = record.serviceId
    record.userId = "";
    record.date = record.date;
    record.time = record.time;
    record.available = true;

    record.save();
    res.send("ok");
  })

  

})


module.exports = router;


