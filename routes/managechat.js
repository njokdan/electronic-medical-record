//jshint esversion:6
const express = require("express");
const Chat = require("../models/chat");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");


//compose a chat
router.get("/compose", ensureAuthenticated, function (req, res) {
    res.render("compose", { currentUser: req.user });
});


//edit a chat
router.get("/edit/:id", ensureAuthenticated, function (req, res) {
    const edit = req.params.id;
    Chat.find({ _id: edit }, function (err, chat) {
        if (err) {
            res.send(err);
        } else {
            if (chat)
                res.render("edit", { chat: chat, currentUser: req.user});
        }

    });
});

//delete chat
router.get("/delete/:id", ensureAuthenticated, function (req, res) {
    const edit = req.params.id;

    Chat.deleteOne({ _id: edit }, function (err) {
        if (err) {
            res.send(err);
        } else {
            req.flash("success_msg", "Chat deleted");
            res.redirect("/");
        }

    });
});


module.exports = router;