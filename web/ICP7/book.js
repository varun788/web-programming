var express = require('express');
var router = express.Router();
var Book = require('../models/Book.js');

/* GET ALL BOOKS */
router.get('/', function (req, res, next) {
  Book.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function (req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* UPDATE BOOK */
router.put('/:id', function (req, res, next) {
  console.log("body0------------",req.body[0]);
  console.log("body1------------",req.body[1]);
  var myquery = {_id: req.params.id};
  var isbn = req.body[0].isbn != "" ? req.body[0].isbn : req.body[1].isbn;
  var title = req.body[0].title != "" ? req.body[0].title : req.body[1].title;
  var author =req.body[0].author != "" ? req.body[0].author : req.body[1].author;
  var description = req.body[0].description != "" ? req.body[0].description: req.body[1].description;
  var publisher = req.body[0].publisher != "" ? req.body[0].publisher : req.body[1].publisher;
  var published_year = req.body[0].published_year != "" ? req.body[0].published_year :req.body[1].published_year;
  var newvalues = { $set: {isbn:isbn, title: title, author: author ,description:description, publisher:publisher, published_year: published_year,} };
  Book.updateOne(myquery, newvalues, function (err, post) {
    if (err)  {console.error(err);return next(err)}
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function (req, res, next) {
  console.log("entered");
  var myquery = {_id: req.params.id};
  Book.deleteOne(myquery, function (err, post) {
    if (err)  {console.error(err);return next(err)}
    res.json(post);
  });
});


module.exports = router;
