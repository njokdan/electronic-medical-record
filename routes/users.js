//jshint esversion:6
const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
const saltRounds = 10;

router.use(bodyParser.json({ limit: '100mb' }));
router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

//model
const User = require("../models/User");
const Patient = require("../models/patient");
const Chat = require("../models/chat");
const Encounter = require("../models/encounter");
const MsgEncounter = require("../models/msgEncounter");

const intro = 'Staff Login';
const msg_highlight1 = 'Smile to make a difference';
const msg_highlight2 = 'Some lives depends on it';

let date_ob = new Date();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

// prints date in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

// prints time in HH:MM format
console.log(hours + ":" + minutes);

function betweenRandomNumber(min, max) {  
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

//user home
router.get("/", (req, res) => res.render("home", { currentUser: req.user, layout:'./layouts/layout_landing', intro:intro, msg_highlight1: msg_highlight1, msg_highlight2:msg_highlight2 }));

//user login
router.get("/signin", (req, res) => res.render("home", { currentUser: req.user, layout:'./layouts/layout_landing', intro:intro, msg_highlight1: msg_highlight1, msg_highlight2:msg_highlight2  }));

//user register
router.get("/register", (req, res) => res.render("./partials/register", { currentUser: req.user, layout:'./layouts/layout_landing', intro:intro, msg_highlight1: msg_highlight1, msg_highlight2:msg_highlight2 }));

//user profile
router.get("/profile", ensureAuthenticated, (req, res) => res.render("dashboard",
  {
    firstname: req.user.fname,
    lastname: req.user.lname,
    currentUser: req.user,
    age:req.user.age,
    gender:req.user.gender,
    cadre:req.user.cadre,
    department:req.user.department,
    email:req.user.email,    
    password:req.user.password,
    layout:'./layouts/layout_profile',
  }));


  //user create new patient
router.get("/create_patient", ensureAuthenticated, (req, res) =>{
  const uniqueId = betweenRandomNumber(1000, 9999);
  const yr = year;
  const patientid = "PID"+"-"+uniqueId+"-"+yr;
  const createdby = req.user._id;
  //console.log(req.user._id);
   res.render("create_patient",
  {
    patientid,
    createdby,
    // firstname: req.user.fname,
    // lastname: req.user.lname,
    // currentUser: req.user,
    // age:req.user.age,
    // gender:req.user.gender,
    // cadre:req.user.cadre,
    // department:req.user.department,
    // email:req.user.email,    
    // password:req.user.password,
    layout:'./layouts/layout_profile',
  })});

  //user create new patient
router.get("/chat", ensureAuthenticated, (req, res) =>{
  // const uniqueId = betweenRandomNumber(1000, 9999);
  // const yr = year;
  // const patientid = "PID"+"-"+uniqueId+"-"+yr;
    Chat.find({}, function (err, posts) {
      if (err) {
          res.send("Uh Oh");
      } else {
          res.render("posts", { chats: chats, currentUser: req.user,layout:'./layouts/layout_profile' });
      }
    });
  // const patientlist = [];//g
  //  res.render("chat",
  // {
  //   patientlist,
  //   layout:'./layouts/layout_profile',
  // })
});

router.post('/chat', (req, res) => {
  const Chat = new Chat(req.body);
  Chat.save((err) =>{
    if(err)
      sendStatus(500);
    res.sendStatus(200);
  })
})

// //user dashboard
// router.get("/dashboard", ensureAuthenticated, (req, res) => res.render("profile",
//   {
//     firstname: req.user.fname,
//     lastname: req.user.lname,
//     currentUser: req.user,
//     age:req.user.age,
//     gender:req.user.gender,
//     cadre:req.user.cadre,
//     department:req.user.department,
//     email:req.user.email,    
//     password:req.user.password,
//     layout:'./layouts/layout_profile',
//   }));  

  //get req for user signout
router.get("/signout", function (req, res, next) {
  req.logout();
  req.flash("success_msg", "You are signed out");
  res.redirect("/users/signin");
});


// router.get("/error", (req, res) => res.render("error",));



//post req for user signin
router.post("/signin", function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/signin",
    failureFlash: true
  })(req, res, next);
});

//registration password validation
router.post("/register", (req, res) => {

  const { fname, lname, age, gender, cadre, department, email, password } = req.body;
  let errors = [];


  //if empty 
  if (!fname || !lname || !age || !gender || !cadre || !department || !email || !password) {
    errors.push({ msg: 'Please fill all fields' });
  }
  //pass length
  if (password) {
    if (password.length < 6) {
      errors.push({ msg: 'Password should be more than 6 characters' });
    }
  }

  //if there are any errors, return to the register page
  if (errors.length > 0) {
    res.render('register', {
        errors,
        fname,
        lname,
        age,
        gender,
        cadre,
        department,
        email,    
        password,
    });

  } else {

    //find the user
    User.findOne({ email: email }, function (foundUser) {

      if (foundUser) {
        errors.push({ msg: 'Email already registered' });
        res.render("register", {
            errors,
            fname,
            lname,
            age,
            gender,
            cadre,
            department,
            email,    
            password,
        });
      } else {

        const newUser = new User({
            fname,
            lname,
            age,
            gender,
            cadre,
            department,
            email,    
            password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                //res.redirect('/users/signin');
                res.redirect('/users');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


//Patient registration password validation
router.post("/createp", (req, res) => {
let ab = [];
ab = req.body;
console.log(ab);
//console.log(req.body.json());
  const { fname, lname, age, gender, height, weight, ward, lga, state, picture, patientid, email, password, createdby } = req.body;
  let errors = [];
///////////////////////
console.log(fname);
console.log(lname);
console.log(age);
console.log(gender);
//console.log(fname);
console.log(height);
console.log(weight);
console.log(ward);
console.log(lga);
console.log(state);
console.log(picture);
console.log(patientid);
console.log(email);
console.log(password);
console.log(createdby);



//////////////
  let bmi_int = weight/height;
  let bmi_dbl = weight%height;
  let bmi = bmi_int+bmi_dbl;
  //if empty 
  if (!fname || !lname || !age || !gender || !height || !weight || !ward || !lga || !state || !picture || !patientid || !email || !password || !createdby) {
    errors.push({ msg: 'Please fill all fields' });
  }
  //pass length
  if (password) {
    if (password.length < 6) {
      errors.push({ msg: 'Password should be more than 6 characters' });
    }
  }
//fname, lname, age, gender, height, weight, ward, lga, state, picture, pid, email, password, createdby
  //if there are any errors, return to the register page
  if (errors.length > 0) {
    res.render('create_patient', {
        errors,
        fname,
        lname,
        age,
        gender,
        height,
        weight,
        ward,
        lga,
        state,
        picture,
        patientid,
        email,    
        password,
        createdby,
        layout:'./layouts/layout_profile',
    });

  } else {

    //find the Patient
    Patient.findOne({ email: email }, function (foundPatient) {

      if (foundPatient) {
        errors.push({ msg: 'Email already registered' });
        res.render("create_patient", {
            errors,
            fname,
            lname,
            age,
            gender,
            height,
            weight,
            ward,
            lga,
            state,
            picture,
            patientid,
            email,    
            password,
            createdby,
            layout:'./layouts/layout_profile',
        });
      } else {
        const createdon = ("0" + date_ob.getDate()).slice(-2);
        const newPatient = new Patient({
            fname,
            lname,
            age,
            gender,
            height,
            weight,
            bmi,
            ward,
            lga,
            state,
            picture,
            patientid,
            email,    
            password,
            createdby,
            createdon
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPatient.password, salt, (err, hash) => {
            if (err) throw err;
            newPatient.password = hash;
            newPatient
              .save()
              .then(Patient => {
                req.flash(
                  'success_msg',
                  'Patient have been registered and can log in'
                );
                //res.redirect('/users/signin');
                res.redirect('/users/create_patient');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


module.exports = router;