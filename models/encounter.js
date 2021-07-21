 //jshint esversion:6
 const mongoose = require("mongoose");

 const EncounterSchema = new mongoose.Schema({
    patient_id: {
        type: String,
        required: true
    },
 
    date: {
        type: Date,
        default: Date.now
    },

    time: {
        type: Date,
        default: Date.now
    },

    visit: {
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
        type: String,
        required: true
    },

    blood_pressure: {
        type: String,
        required: true
    },

    temperature: {
        type: String,
        required: true
    },

    respiratory_rate: {
        type: Number,
        required: true
    },

    complaints: {
        type: String,
        required: true
    },

    diagnostic: {
        type: String,
        required: true
    },

    treatment_plan: {
        type: String,
        required: true
    },

    picture: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    }
 
 }); 
 
 const Encounter = mongoose.model('Encounter', EncounterSchema);
 module.exports = Encounter;