var express = require('express');
var router = express.Router();
var predictInfo = require('../model/predictInfo');

//해당 주식에 대한 상세한 정보(텐서플로우를 돌려서 나온 정보 및 그래프)
router.get('/:id', function (req, res, next) {
    let company = req.params.id
    //한 종목 데이터
    predictInfo.findOne({
        company: company
    }, function (err, data) {
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
module.exports = router;