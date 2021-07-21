//jshint esversion:6
const express = require("express");
const router = express.Router();
//const Post = require("../models/posts");
const { subscribe } = require("./manage");
const { ensureAuthenticated } = require("../config/auth");


//index page
router.get("/", function (req, res) {
    const intro = 'Your Health Update';
    const msg_highlight1 = 'Your Health is your wealth';
    const msg_highlight2 = 'You can get the best of Treatments you deserve with us.';      

    res.render("index", { title:'', layout:'./layouts/layout_landing',intro:intro, msg_highlight1: msg_highlight1, msg_highlight2:msg_highlight2 });

    // Post.find({}, function (err, posts) {
    //     res.render("index",
    //         { posts: posts, currentUser: req.user }
    //     );
    // });
});


module.exports = router;