 //jshint esversion:6
 const mongoose = require("mongoose");

 const ChatSchema = new mongoose.Schema({
    
    sender_id: {
        type: String,
        required: true
    },

    recipient_id: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    status: {
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
 
 const Chat = mongoose.model('Chat', ChatSchema);
 module.exports = Chat;