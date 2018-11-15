var express = require('express');
var router = express.Router();
var User = require('../model/user');
// var Favorites = require('../model/favorites');
var StockList = require('../model/stockList');

router.get('/:userId', function (req, res, next) {
    const user = new User();
    var userId = req.params.userId;
    //관심 종목 데이터
    User.find({
        _id: userId,
        favorites
    }, (err, data) => {

    })
});

router.get('/all', function (req, res, next) {
    //전체 종목 데이터
    StockList.find((err, data) => {

    })
});

module.exports = router;