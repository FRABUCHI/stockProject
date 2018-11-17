var express = require('express');
var router = express.Router();
var User = require('../model/user');
// var Favorites = require('../model/favorites');
var StockList = require('../model/stockList');

router.get('/:userId', function (req, res, next) {
    const user = new User();
    var userId = req.params.userId;
    //관심 종목 데이터
    User.find({_id: userId}, (err, data) => {
        if (err) res.status(500).send({
            error: 'database failure'
        });
        console.log('Favorites: ' + data);
    })
});

router.get('/all', function (req, res, next) {
    //전체 종목 데이터
    StockList.find(function (err, data) {
        // 구문 error
        if (err) return res.status(500).json({
            error: err
        });
        // User가 없으면 error
        if (!data) return res.status(404).json({
            error: 'data not found'
        });
        console.log('Stock List: ' + data);
        res.json(data);
    })
});

router.post('/:userId', function (req, res, next) {
    const user = new User();
    var userId = req.params.userId;
    //관심 종목 데이터
    User.insert({
        _id: userId
    }, (err, data) => {
        if (err) res.status(500).send({
            error: 'database failure'
        });
        console.log('Favorites: ' + data);
    })
});

module.exports = router;