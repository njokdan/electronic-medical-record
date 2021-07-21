//jshint esversion:6
const express = require("express");
const Encounter = require("../models/encounter");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");


//compose an encounter
router.get("/compose", ensureAuthenticated, function (req, res) {
    res.render("compose", { currentUser: req.user });
});


//edit an encounter
router.get("/edit/:id", ensureAuthenticated, function (req, res) {
    const edit = req.params.id;
    Encounter.find({ _id: edit }, function (err, encounter) {
        if (err) {
            res.send(err);
        } else {
            if (encounter)
                res.render("edit", { encounter: encounter, currentUser: req.user});
        }

    });
});

//delete encounter
router.get("/delete/:id", ensureAuthenticated, function (req, res) {
    const edit = req.params.id;

    Encounter.deleteOne({ _id: edit }, function (err) {
        if (err) {
            res.send(err);
        } else {
            req.flash("success_msg", "Encounter deleted");
            res.redirect("/");
        }

    });
});


module.exports = router;