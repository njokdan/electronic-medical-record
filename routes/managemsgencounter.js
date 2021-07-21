//jshint esversion:6
const express = require("express");
const MsgEncounter = require("../models/msgEncounter");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");


//compose an MsgEncounter
router.get("/compose", ensureAuthenticated, function (req, res) {
    res.render("compose", { currentUser: req.user });
});


//edit an MsgEncounter
router.get("/edit/:id", ensureAuthenticated, function (req, res) {
    const edit = req.params.id;
    MsgEncounter.find({ _id: edit }, function (err, msgEncounter) {
        if (err) {
            res.send(err);
        } else {
            if (msgEncounter)
                res.render("edit", { msgEncounter: msgEncounter, currentUser: req.user});
        }

    });
});

//delete MsgEncounter
router.get("/delete/:id", ensureAuthenticated, function (req, res) {
    const edit = req.params.id;

    MsgEncounter.deleteOne({ _id: edit }, function (err) {
        if (err) {
            res.send(err);
        } else {
            req.flash("success_msg", "MsgEncounter deleted");
            res.redirect("/");
        }

    });
});


module.exports = router;