require('dotenv').config();
const mongoose = require("mongoose"); 

mongoose.connect('mongodb://localhost:27017/masterDB');

//Initializing schema for apollo database
const apolloUserSchema = new mongoose.Schema({
    hosp_id: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    name: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    mob_no: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    prescription_id: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    prescription_data: {
        type: Object,
        required: [true, "This field cannot be empty!"]
    }

});


// Initializing schema for City Hospital's database
const chsUserSchema = new mongoose.Schema({
    hosp_id: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    name: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    mob_no: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    prescription_id: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    prescription_data: {
        type: Object,
        required: [true, "This field cannot be empty!"]
    }
});


//Initializing schema for SUM's database
const sumUserSchema = new mongoose.Schema({
    hosp_id: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    name: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    mob_no: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    prescription_id: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    prescription_data: {
        type: Object,
        required: [true, "This field cannot be empty!"]
    }
});


//Initializing schema for Health Plus' user database
const hpindividualUserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    name: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    mob_no: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    user_data: {
        type: Object
    },
    prescription_id: {
        type: Array
    },
    oth_prescription: {
        type: Object
    }
});

//Initializing schema for doctor's database

const doctorUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    hosp_id: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    doctor_id: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    doctor_passcode: {
        type: String,
        required: [true, "This field cannot be empty!"]
    },
    patient_list: {
        type: Object
    },
});

const ApolloUser = mongoose.model('apolloUser', apolloUserSchema);
const ChsUser = mongoose.model('chsUser', chsUserSchema);
const SumUser = mongoose.model('sumUser', sumUserSchema);
const HpindividualUser = mongoose.model('hpindividualUser', hpindividualUserSchema);
const DoctorUser = mongoose.model('doctorUser', doctorUserSchema);

function isUserExist(mob_no, res){
    let exists = 0;
    HpindividualUser.find(function(err, mob_nos){
        mob_nos.forEach(function(number){
            if(number.mob_no == mob_no){
               return true;
            }
        });
    });
}
// We will add a new user by giving them a unique id. This id will be used as a reference 
// to fetch user data directly from Health+ database and then display their custom dashboard accordingly.
function addUser(uid, name, mob_no, user_data, res){
    const store_pid = [];
    ApolloUser.find(function(err, ids){
        // console.log(store_pid);
        ids.forEach(function(id){
            if((id.mob_no == mob_no) && (id.prescription_id != null)){
                store_pid.push(`${id.prescription_id}`);
            }
        });
    });
    
    ChsUser.find(function(err, ids){
        // console.log(store_pid);
        ids.forEach(function(id){
            if(id.mob_no == mob_no && id.prescription_id != null){
                store_pid.push(id.prescription_id);
            }
        });
    });

    SumUser.find(function(err, ids){
        // console.log(store_pid);
        ids.forEach(function(id){
            if(id.mob_no == mob_no && id.prescription_id != null){
                store_pid.push(id.prescription_id);
            }
        });
    });

    
    if(store_pid != null){
        const hpindividualD1 = new HpindividualUser({
            uid: uid,
            name: name,
            mob_no: mob_no,
            user_data: user_data,
            prescription_id: store_pid,
            oth_prescription: null
        });
        
        hpindividualD1.save(function(err){
            if(err){
                console.log(err);
            } else {
                console.log("Successfully saved into the database");
                res.render("user_dashboard");
            }
        });
    }

    // console.log(store_pid);
    //If store_pid is empty then send a prompt to upload prescription's pic
    //If not empty then fetch the prescription data and send to dashboard
}

// We are fetching the credentials from Health+ database of doctors.
// This will consist of name of the doctor, the hospital he is currently associated with,
// and the list of patients the doctor is diagnoising.
function validateDoctorLogin(res, userName, password){
    DoctorUser.findOne({doctor_id: userName, doctor_passcode: password}, function(err, foundList){
        if(!err){
            if(foundList){
                res.render("doc_dashboard", {
                    name: foundList.name,
                    hosp: hosp_id,
                    patient_list: [foundList.patient_list[0], foundList.patient_list[1]],
                })
            }
        }
    });
}

function getUserDashboardData(res, req, mobilenumber){

    // We will be making a function which will scan all the databases and fetch the latest prescription.
    // Here, we are assuming that the patient visisted Apollo, the previous time.

    ApolloUser.findOne({mob_no: mobilenumber}, function(err, foundList){
        if(!err){
            if(foundList){
                var name = foundList.name;
                var gender = foundList.prescription_data.user_data.sex;
                var hosp = "Apollo Institute of Medical Sciences";
                var med1 = [foundList.prescription_data.medicine[0].name, foundList.prescription_data.medicine[0].dosage];
                var med2 = [foundList.prescription_data.medicine[1].name, foundList.prescription_data.medicine[1].dosage];
                var next_appointment = foundList.prescription_data.next_appointment;
                if(gender == "Male"){
                    var imgSrc = "../public/images/pf1.jpg"
                } else {
                    var imgSrc = "pm2.webp"
                }

                // We will be fetching user data from Health+ database which would include BP, Sugar level and more!
                // For dummy purpose, we are hard coding some of the data.
                
                res.render("user_dashboard", {
                    name: name,
                    imgSrc: imgSrc,
                    hosp: hosp,
                    med1: med1,
                    med2: med2,
                    next_appointment: next_appointment,
                    blood_pressure: "120 | 80",
                    sugar_level: "95",
                    blood_group: "A+"

                });

            }
        }
    });

}

// Exporting the functions so that we can call them from app.js
module.exports = {isUserExist, addUser, validateDoctorLogin, getUserDashboardData};