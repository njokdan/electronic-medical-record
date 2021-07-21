 //jshint esversion:6
 const mongoose = require("mongoose");

 const PatientSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
 
    lname: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    bmi: {
        type: Number,
        required: true
    },

    ward: {
        type: String,
        required: true
    },

    lga: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    picture: {
        type: String,
        required: true
    },

    patientid: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    createdby: {
        type: String,
        required: true
    },
    
    createdon: {
        type: String,
        required: true
        
    }
 
 }); 
 
 const Patient = mongoose.model('Patient', PatientSchema);
 module.exports = Patient;

//  fname,
//             lname,
//             age,
//             gender,
//             height,
//             weight,
//             bmi,
//             ward,
//             lga,
//             state,
//             picture,
//             pid,
//             email,    
//             password,
//             createdby,
//             date