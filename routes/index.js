/* GET home page. */

require('dotenv').config({path: 'info.env'});
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB;
//Set up default mongoose connection
mongoose.connect(mongoDB, {});
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("connected to mongo");
});
/**Begin SCHEMAS*/
var Schema = mongoose.Schema;

const applyForMeSchema = new Schema({
    industry: {type: String, required: true},
    education: {type: String, required: true},
    email: {type: String, required: true}

});

const productIntuitionModel = mongoose.model('ApplyForMe', applyForMeSchema, 'ApplyForMe');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Apply For Me'});
});

router.post('/ApplyForMe*?', function (req, res, next) {
    var submission = new productIntuitionModel({
        industry: req.body.industry,
        education: req.body.education,
        email: req.body.email
    });
    submission.save(function (err) {
        if (err) {
            res.status(500).send({"errors": err.errors});
            debug(err);
        } //Handle this error however you see fit
        else {
            res.send("success!");
        }
    });
});

module.exports = router;
