var express = require('express');
var router = express.Router();

var mongo = require('mongojs');
var db = mongo('mongodb://ethiochat:ethiochat@ds123728.mlab.com:23728/ethiochat', ['messages']);

//Get all chats
router.get('/', function(req, res, next){
    db.messages.find(function(err, chats){
        if(err)
            res.send(err);
        res.json(chats);
    });
});

//Save chat
router.post('/', function(req, res, next){
    var chat = req.body;
    //{"message" : chat.message, "sender" : chat.sender,"receiver" : chat.receiver,"date" : chat.date}
        db.messages.save(chat, function(err, chat){
            if(err)
                res.send(err);  
            res.json(chat);
        });
})

//Get a all chat by a single user
router.get('/:memberUsername', function(req, res, next){
    let loggedInUser = req.params.memberUsername;
    db.messages.find({$or: [{sender: loggedInUser}, {receiver: loggedInUser}]},function(err, chat){
        if(err)
            res.send(err);
        res.json(chat);
    });
    // db.messages.findOne({_id: mongo.ObjectId(req.params.id)},function(err, chat){
    //     if(err)
    //         res.send(err);
    //     res.json(chat);
    // });
});


/* GET CHATS by Room */
router.get('/:room', function(req, res, next) {
    Chat.find({ room: req.params.room }, function (err, chats) {
      if (err) return next(err);
      res.json(chats);
    });
  });


//Delete chat
router.delete('/:id', function(req, res, next){
    
    db.messages.remove({_id: mongo.ObjectId(req.params.id)},function(err, chat){
        if(err)
            res.send(err);
        res.json(chat);
    });
});


module.exports = router;