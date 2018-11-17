var express = require('express');
var router = express.Router();
const User = require('../model/user');
const crypto = require('crypto'); //Node.js에서 제공하는 암호화 모듈

router.post('/', function (req, res, next) {
    //DB에서 확인할때 암호화 된 키로 확인한다
    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(req.body.user.password, 'utf8', 'base64');
    let cipherPw = cipher.final('base64');

    // find user in MongoDB
    User.findOne({
        id: req.body.user.id,
        password: cipherPw
    }, function (err, user) {
        // 구문 error
        if (err) return res.status(500).json({
            error: err
        });
        // User가 없으면 error
        if (!user) return res.status(404).json({
            error: 'user not found'
        });
        res.json(user);
    })
});


module.exports = router;