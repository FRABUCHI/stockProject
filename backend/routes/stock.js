var express = require('express');
var router = express.Router();
var User = require('../model/user');
var StockList = require('../model/stockList');
var Favorites = require('../model/favorites');

//즐겨찾기 가져오기
router.post('/favorites', function (req, res, next) {
    let userId = req.body.userId;
    console.log(userId)
    //관심 종목 데이터
    User.findOne({id: userId}, (err, data) => {
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

//전체 종목 데이터 받기
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
})

//한종목 데이터만 받기
router.get('/:id', function (req, res, next) {
    let company = req.params.id
    //한 종목 데이터
    StockList.findOne({company: company},function (err, data) {
        // 구문 error
        if (err) return res.status(500).json({
            error: err
        });
        // 주식 리스트가가 없으면 error
        if (!data) return res.status(404).json({
            error: 'data not found'
        });
        console.log(`${company}`)
        console.log(data)
        res.json(data);
    })
})

//즐겨찾기 추가
router.post('/addFavorites', function (req, res, next) {
    let userId = req.body.userId;
    let company = {
        "company": req.body.company
    };
    console.log(userId + ' ' + req.body.company)
    
    User.update({id: userId}, {$addToSet: {favorites: company}})
    .exec((err, data)=>{
        console.log(data.favorites)
        res.json(data.favorites)
    })
})

//즐겨찾기 삭제
router.post('/deleteFavorites', function (req, res, next) {
    let userId = req.body.userId;
    let company = {
        "company": req.body.company
    };
    console.log(req.body.company)
    console.log(userId + ' ' + company)

    User.findOneAndUpdate({
            id: userId
        }, {
            $pull: {
                favorites: company
            }
        })
        .exec((err, data) => {
            res.json(data)
        })
})

module.exports = router;