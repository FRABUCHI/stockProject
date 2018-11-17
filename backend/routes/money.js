var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    //상한가인 종목만 추려서 그 종목에 대한 정보만 프론트에 넘겨줌
    //넘긴 정보를 프론트에서 탐욕 알고리즘으로 처리
    res.render
});

module.exports = router;