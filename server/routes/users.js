const express = require('express');
const router = express.Router();
//const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var mongo = require('mongojs');
var db = mongo('mongodb://ethiochat:ethiochat@ds123728.mlab.com:23728/ethiochat', ['users'])

// Connect
// const connection = (closure) => {
//     return MongoClient.connect('mongodb://ethiochat:ethiochat@ds123728.mlab.com:23728/ethiochat', (err, db) => {
//         if (err) return console.log(err);

//         closure(db);
//     });
// };

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/', (req, res) => {
        db.collection('users')
            .find(function(err, users){
                if(err)
                    res.send(err);
                else{
                response.data = users;
                res.json(response);
                }
            });   
});

module.exports = router;