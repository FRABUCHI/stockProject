var express = require('express');
var router = express.Router();
var predictInfo = require('../model/predictInfo');

//예측 상한가 주식 정보
router.get('/', function (req, res, next) {
    //한 종목 데이터
    predictInfo.find((err, data) => {
        // 구문 error
        if (err) return res.status(500).json({
            error: err
        });
        // 주식 리스트가가 없으면 error
        if (!data) return res.status(404).json({
            error: 'data not found'
        });
        console.log(data)
        res.json(data);
    })
})
module.exports = router;