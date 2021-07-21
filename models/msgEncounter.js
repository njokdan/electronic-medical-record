 //jshint esversion:6
 const mongoose = require("mongoose");

 const MsgEncounterSchema = new mongoose.Schema({
    encounter_id: {
        type: String,
        required: true
    },

    sender_id: {
        type: String,
        required: true
    },

    recipient_id: {
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

 }); 
 
 const MsgEncounter = mongoose.model('MsgEncounter', MsgEncounterSchema);
 module.exports = MsgEncounter;