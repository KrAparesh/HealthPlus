require('dotenv').config();
const mongoose = require("mongoose");
const { ModelBuildInstance } = require('twilio/lib/rest/autopilot/v1/assistant/modelBuild');

function connectDbs() {
    //Making connnection requests to all databases
    mongoose.connect('mongodb://localhost:27017/masterDB');
    //Initializing connection to apollo database

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


    // Initializing connection to City Hospital's database
    
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
    

    //Initializing connection to SUM's database
    
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

    //Initializing connection to Health Plus' user database
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

    // //Initializing connection to Health Plus' institute database
    // const hpinstituteUserSchema = new mongoose.Schema({
    //     name: {
    //         type: String,
    //         required: [true, "This field cannot be empty!"]
    //     },
    //     mob_no: {
    //         type: String,
    //         required: [true, "This field cannot be empty!"]
    //     },
    //     prescription_id: {
    //         type: String,
    //         required: [true, "This field cannot be empty!"]
    //     },
    //     prescription_data: {
    //         type: Object,
    //         required: [true, "This field cannot be empty!"]
    //     }
    // });

    //Initializing connection to doctor's database
    
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

    console.log("Successfully connected to the databases");
    const ApolloUser = mongoose.model('apolloUser', apolloUserSchema);
    const ChsUser = mongoose.model('chsUser', chsUserSchema);
    const SumUser = mongoose.model('sumUser', sumUserSchema);
    const HpindividualUser = mongoose.model('hpindividualUser', hpindividualUserSchema);
    //const HpinstituteUser = mongoose.model('hpinstituteUser', hpinstituteUserSchema);
    const DoctorUser = mongoose.model('doctorUser', doctorUserSchema); 

    addDummyData(ApolloUser, ChsUser, SumUser, HpindividualUser, DoctorUser);
}

function addDummyData(ApolloUser, ChsUser, SumUser, HpindividualUser, DoctorUser){
    
    const apD1 = new ApolloUser({
        hosp_id: "ApolloHP",
        name: "Aparesh Kumar",
        mob_no: "9835945918",
        prescription_id: "214101",
        prescription_data: {
            user_data:{
                age: "30",
                sex: "Male"
            },
            diagnosis: ["The patient suffers with periodically high blood pressure",
                        "The patient is stable under standard testing condition",
                        "Blood platelets are inconsistent"],
            treatment: ["Suggested Yoga and meditation sessoins",
                        "Control on eatery habit, improve diet"
                        ],
            medicine: [
                {
                    name: "vixlogocile",
                    dosage: "Once per day",
                    duration: "1 week"
                },
                {
                    name: "Vitamin B Complex",
                    dosage: "Once per day",
                    duration: "4 days"
                }
            ],
            next_appointment: ["9th of January"]
        }
    });

    const apD2 = new ApolloUser({
        hosp_id: "ApolloHP",
        name: "Adnan Shahid",
        mob_no: "970900783",
        prescription_id: "214102",
        prescription_data: {
            user_data:{
                age: "22",
                sex: "Male"
            },
            diagnosis: ["The patient suffers with chronic disease",
                        "Pain due to loss of calcium, signs of osteoporosis",
                        "Blood platelets are inconsistent"],
            treatment: ["Increase in calcium intake is highly recommended",
                        "Reduce sporty activities and excessive workouts"
                        ],
            medicine: [
                {
                    name: "Calcium suppliment tab",
                    dosage: "Once per day",
                    duration: "1 week"
                },
                {
                    name: "Vitamin B Complex",
                    dosage: "Once per day",
                    duration: "4 days"
                }
            ],
            next_appointment: "9th of January"
        }
    });
    
    const chD1 = new ChsUser({
        hosp_id: "CityHP",
        name: "Aparesh Kumar",
        mob_no: "9835945918",
        prescription_id: "214101",
        prescription_data: {
            user_data:{
                age: "30",
                sex: "Male"
            },
            diagnosis: ["The patient suffers with periodically high blood pressure",
                        "The patient is stable under standard testing condition",
                        "Blood platelets are inconsistent"],
            treatment: ["Suggested Yoga and meditation sessoins",
                        "Control on eatery habit, improve diet"
                        ],
            medicine: [
                {
                    name: "vixlogocile",
                    dosage: "Once per day",
                    duration: "1 week"
                },
                {
                    name: "Vitamin B Complex",
                    dosage: "Once per day",
                    duration: "4 days"
                }
            ],
            next_appointment: "9th of January"
        }
    });

    const chD2 = new ChsUser({
        hosp_id: "CityHP",
        name: "Aparesh Kumar",
        mob_no: "9835945918",
        prescription_id: "214101",
        prescription_data: {
            user_data:{
                age: "30",
                sex: "Male"
            },
            diagnosis: ["The patient suffers with periodically high blood pressure",
                        "The patient is stable under standard testing condition",
                        "Blood platelets are inconsistent"],
            treatment: ["Suggested Yoga and meditation sessoins",
                        "Control on eatery habit, improve diet"
                        ],
            medicine: [
                {
                    name: "vixlogocile",
                    dosage: "Once per day",
                    duration: "1 week"
                },
                {
                    name: "Vitamin B Complex",
                    dosage: "Once per day",
                    duration: "4 days"
                }
            ],
            next_appointment: "9th of January"
        }
    });

    const sumD1 = new SumUser({
        hosp_id: "sumHP",
        name: "Adnan Shahid",
        mob_no: "970900783",
        prescription_id: "214102",
        prescription_data: {
            user_data:{
                age: "22",
                sex: "Male"
            },
            diagnosis: ["The patient suffers with chronic disease",
                        "Pain due to loss of calcium, signs of osteoporosis",
                        "Blood platelets are inconsistent"],
            treatment: ["Increase in calcium intake is highly recommended",
                        "Reduce sporty activities and excessive workouts"
                        ],
            medicine: [
                {
                    name: "Calcium suppliment tab",
                    dosage: "Once per day",
                    duration: "1 week"
                },
                {
                    name: "Vitamin B Complex",
                    dosage: "Once per day",
                    duration: "4 days"
                }
            ],
            next_appointment: "9th of January"
        }
    });

    const sumD2 = new SumUser({
        hosp_id: "sumHP",
        name: "Adnan Shahid",
        mob_no: "970900783",
        prescription_id: "214102",
        prescription_data: {
            user_data:{
                age: "22",
                sex: "Male"
            },
            diagnosis: ["The patient suffers with chronic disease",
                        "Pain due to loss of calcium, signs of osteoporosis",
                        "Blood platelets are inconsistent"],
            treatment: ["Increase in calcium intake is highly recommended",
                        "Reduce sporty activities and excessive workouts"
                        ],
            medicine: [
                {
                    name: "Calcium suppliment tab",
                    dosage: "Once per day",
                    duration: "1 week"
                },
                {
                    name: "Vitamin B Complex",
                    dosage: "Once per day",
                    duration: "4 days"
                }
            ],
            next_appointment: "9th of January"
        }
    });

    const hpindividualD1 = new HpindividualUser({
        uid: "AdnSha01",
        name: "Adnan Shahid",
        mob_no: "970900783",
        user_data: {
            height: "150",
            weight: "70",
            age: "24",
            blood_group: "A+"
        },
        prescription_id: ["214102", "214103"],
        oth_prescription: null
    });

    const hpindividualD2 = new HpindividualUser({
        uid: "AdnSha01",
        name: "Adnan Shahid",
        mob_no: "970900783",
        user_data: {
            height: "150",
            weight: "70",
            age: "24",
            blood_group: "A+"
        },
        prescription_id: ["214104", "214105"],
        oth_prescription: null
    });

    const doctorD1 = new DoctorUser({
        name: "Adnan Shahid",
        hosp_id:"sumHP",
        doctor_id:"AdnShaDoc",
        doctor_passcode:"adukadu",
        patient_list: [
            {
                name: "Aparesh Kumar",
                uid: "Apakr54",
                next_appointment: "25th Jan, 2023"
            },
            {
                name: "Raj Aryan",
                uid: "RajAr54",
                next_appointment: "26th Jan, 2024"
            }
        ]
    });

    const doctorD2 = new DoctorUser({
        name: "Adnan Shahid",
        hosp_id:"sumHP",
        doctor_id:"AdnShaDoc",
        doctor_passcode:"adukadu",
        patient_list: [
            {
                name: "Aparesh Kumar",
                uid: "Apakr54",
                next_appointment: "25th Jan, 2023"
            },
            {
                name: "Raj Aryan",
                uid: "RajAr54",
                next_appointment: "26th Jan, 2024"
            }
        ]
    });


    ApolloUser.insertMany([apD1, apD2], function(err){
        if(err){
            console.log("Error encountered:", err);
        } else {
            console.log("Successfully added data into the database!");
        }
    });
    ChsUser.insertMany([chD1, chD2], function(err){
        if(err){
            console.log("Error encountered:", err);
        } else {
            console.log("Successfully added data into the database!");
        }
    });
    SumUser.insertMany([sumD1, sumD2], function(err){
        if(err){
            console.log("Error encountered:", err);
        } else {
            console.log("Successfully added data into the database!");
        }
    });
    HpindividualUser.insertMany([hpindividualD1, hpindividualD2], function(err){
        if(err){
            console.log("Error encountered:", err);
        } else {
            console.log("Successfully added data into the database!");
        }
    });
    DoctorUser.insertMany([doctorD1, doctorD2], function(err){
        if(err){
            console.log("Error encountered:", err);
        } else {
            console.log("Successfully added data into the database!");
        }
    });
}

module.exports = connectDbs;
