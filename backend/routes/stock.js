var express = require('express');
var router = express.Router();
var User = require('../model/user');
var StockList = require('../model/stockList');

router.get('/favorites', function (req, res, next) {
    //let id = req.body.id
    //관심 종목 데이터
    User.findOne({
        //id: id
        id: 'syl'
    }, (err, data) => {
        if (err) res.status(500).send({
            error: 'database failure'
        });
        // User가 없으면 error
        if (!data) return res.status(404).json({
            error: 'data not found'
        });
        console.log('Favorites: ' + data.favorites);
        res.json(data.favorites);
    })
});

router.get('/all', function (req, res, next) {
    //전체 종목 데이터
    StockList.find(function (err, data) {
        // 구문 error
        if (err) return res.status(500).json({
            error: err
        });
        // 주식 리스트가가 없으면 error
        if (!data) return res.status(404).json({
            error: 'data not found'
        });
        console.log('Stock List: ' + data);
        res.json(data);
    })
});

router.post('/addFavorites', function (req, res, next) {
            let userId = req.body.userId;
            let company = req.body.company;
            console.log(userId+' '+ company)
            User.findOneAndUpdate({
                    id: userId
                }, 
                {
                    $push: {
                        id: company
                    }
                });
            });

        module.exports = router;