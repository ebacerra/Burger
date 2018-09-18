var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    res.redirect('/burgers');
});

router.get("/burgers", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);

        res.render("index", hbsObject);
    });
});

router.post("/burgers/create", function (req, res) {

    console.log(req.body);
    burger.insertOne([
        "burger_name", "devoured"
    ], [
            req.body.ca, 0

        ], function (result) {
            // Send back the ID of the new quote
            console.log({ id: result.insertId });
            res.redirect('/burgers');
            // console.log(req.body.burger_name, req.body.devoured);
        });
});

router.put("/burgers/update/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("hello");

    console.log("condition", condition);

    burger.update({
        devoured: 1

    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
        // console.log(devoured + "Test!")
        // res.redirect('/burgers');

    });
});

// router.delete("/api/burger/:id", function (req, res) {
//     var condition = "id = " + req.params.id;

//     burger.delete(condition, function (result) {
//         if (result.affectedRows == 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

// Export routes for server.js to use.
module.exports = router;
