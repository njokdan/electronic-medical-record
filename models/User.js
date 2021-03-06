 //jshint esversion:6
 const mongoose = require("mongoose");

 const UserSchema = new mongoose.Schema({
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

    cadre: {
        type: String,
        required: true
    },

    department: {
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
    
    date: {
        type: Date,
        default: Date.now
    }
 
 }); 
 
 const User = mongoose.model('User', UserSchema);
 module.exports = User;