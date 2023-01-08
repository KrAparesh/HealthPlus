require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const sendSms = require("./src/auth.js"); // Requiring the sendSms function from authentication code.
const connectDbs = require("./components/database/connection.js"); // Requiring the connection function from connections code.
const {isUserExist, addUser, validateDoctorLogin, getUserDashboardData} = require("./components/database/validators.js")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// connectDbs(); We used this to populate sample data into our locally hosted mongoDB server.

var tempVar = "";
var mobilenumber = ""; // Temp variables to store cache data.

app.get("/", function(req, res) {
    res.render('login');
});

app.post("/login", function(req, res){
    mobilenumber = req.body.mobileNumber;
    if(!mobilenumber.startsWith("+"))
        mobilenumber = "+91" + mobilenumber;
    tempVar = Math.floor((1000 * (1 + Math.random())));
    sendSms(mobilenumber, tempVar)  // This will send the client an OTP which will be later verified.
});

app.post("/verify", function(req, res){
    var myotp = req.body.l1 + req.body.l2 + req.body.l3 + req.body.l4;
    if(myotp == tempVar){
        // Check if mob no is in hpindividual database, if yes then fetch prescription data and send to dashboard
        // If not found, send to sign-up page.
        if(!(isUserExist(mobilenumber) == true)){            
            tempVar = null;
            console.log("The user exists");
            
            res.render("user_dashboard");
        } else {
            console.log("The user doesn't exist");
            res.render("signup");
        }
    }
    else {
        console.log("Incorrect OTP");
    }
});

// Setting up sign-up form

app.get("/signup", function(req, res){
    res.render("signup", {
        mobile: mobilenumber
    });
});

app.post("/signup", function(req,res){
    if(req.body.mobileInp == null){
        var mob_no = mobilenumber;
    } else {
        var mob_no = req.body.mobileInp;
    }
    var name = req.body.nameInp;
    user_data = {
        height: req.body.heightInp,
        weight: req.body.weightInp,
        age: req.body.ageInp,
        blood_group: req.body.bloodgrpInp
    }

    var uid = name.substring(0, 4) + mob_no.substring(mob_no.length - 4, mob_no.length);
    addUser(uid, name, mob_no, user_data, res);
    
})

//Setting up doctor sign-in

app.get("/doctor", function(req, res){
    res.render("doctor");
});

app.post("/doctor", function(req, res){
    validateDoctorLogin(res, req.body.inpName, req.body.currPassword);
});

//Setting up user dashboard

app.get("/user_dashboard", function(req, res){
    getUserDashboardData(res, req, "9835945918");
})

app.get("/doc_dashboard", function(req, res){
    res.render("doc_dashboard");
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});