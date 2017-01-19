var express = require('express');
var ObjectID = require('mongodb').ObjectID
var router = express.Router();

/* GET home page. */
// router.get('/myjournal', function(req, res, next) {
//   res.render('myjournal', { title: 'My Journal!' });
// });

/* GET Userlist page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('myjournal', {
            "userlist" : docs
        });
    });
});

router.get('/entry', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('entry', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

// /* POST to Add User Service */
// router.post('/adduser', function(req, res) {
//
//     // Set our internal DB variable
//     var db = req.db;
//
//     // Get our form values. These rely on the "name" attributes
//     // var userDate = req.res.userdate;
//
//     var userName = req.body.username; //use for date
//     var userEmail = req.body.useremail;
//     var userMessage = req.body.usermessage;
//
//     // Set our collection
//     var collection = db.get('usercollection');
//
//     // Submit to the DB
//     collection.insert({
//         "username" : userName,
//         "email" : userEmail,
//         "message" : userMessage
//     }, function (err, doc) {
//         if (err) {
//             // If it failed, return error
//             res.send("There was a problem adding the information to the database.");
//         }
//         else {
//             // And forward to success page
//             res.redirect("/");
//         }
//     });
// });

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    // var userDate = req.res.userdate;

    var userDate = req.body.userdate; //use for date
    // var userEmail = req.body.useremail;
    var userMessage = req.body.usermessage;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "userdate" : userDate,
        // "email" : userEmail,
        "message" : userMessage
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }
    });
});

//delete guest book entry
router.get('/:id', function(req,res){
	var id = req.params.id;
	var objectId = new ObjectID(id);

	var db = req.db;
	var collection = db.get('usercollection');
	console.log(collection);
	collection.remove({_id: objectId});
	res.redirect('/');
});

//get user name or date
router.get('/:id/userdate', function(req,res){
	var id = req.params.id;
	var objectId = new ObjectID(id);

	var db = req.db;
	var collection = db.get('usercollection');
	console.log(collection);
	collection.find({_id: objectId}, function(err, result){

		if(err){
			res.send("there was an error");
		}
		else{
		res.render('date', {
				"userdate" : result
			});
		//res.json(result);
		}
	});
});

//get user message
router.get('/:id/usermessage', function(req,res){
	var id = req.params.id;
	var objectId = new ObjectID(id);

	var db = req.db;
	var collection = db.get('usercollection');
	console.log(collection);
	collection.find({_id: objectId}, function(err, result){

		if(err){
			res.send("there was an error");
		}
		else{
		res.render('message', {
				"usermessage" : result
			});
		//res.json(result);
		}
	});
});


module.exports = router;
