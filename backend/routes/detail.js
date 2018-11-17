var express = require('express');
var router = express.Router();

router.get('/:stockId', function (req, res, next) {
    //해당 주식에 대한 상세한 정보(텐서플로우를 돌려서 나온 정보 및 그래프)
});

module.exports = router;