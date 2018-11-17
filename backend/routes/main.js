var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  //메인페이지 렌더링
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

module.exports = router;