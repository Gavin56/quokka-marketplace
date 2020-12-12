const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();
require('dotenv').config();

const apiKey = process.env.API_KEY;
console.log(apiKey);

router.get("/api/user_data", function (req, res) {
    if (!req.user) {
        res.json({});
    } else {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    }
});

router.get("/api/listing", function (req, res) {
    db.Listing.findAll({}).then(function (listing) {
        res.json(listing);
    });
});

router.post("/api/listing", function (req, res) {
    db.Listing.create(req.body).then(function (listing) {
        res.json(listing);
    });
});
router.post("/api/signup", function (req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function () {
        res.redirect(307, "/api/login");
    }).catch(function (err) {
        res.status(401).json(err);
    });
});

router.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
});

module.exports = router;