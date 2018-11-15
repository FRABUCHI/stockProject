var express = require('express');
var router = express.Router();
var User = require('../model/user');
const crypto = require('crypto'); //Node.js에서 제공하는 암호화 모듈

router.get('/', function (req, res) {
    User.find((err, user) => {
        if (err) res.status(500).send({
            error: 'database failure'
        });
        res.send(user)
    });
})

// 회원가입
router.post('/', function (req, res, next) {
    const user = new User();
    // 사용자 정보
    user.id = req.body.user.id;
    user.password = req.body.user.password;
    user.name = req.body.user.name;
    user.email = req.body.user.name;
    user.isAdmin = 0;

    // 암호화 
    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(user.password, 'utf8', 'base64');
    let cipheredOutput = cipher.final('base64');
    user.password = cipheredOutput;
    /*  
      //복호화 decryption
      let decipher = crypto.createDecipher('aes192', 'key');
      decipher.update(cipheredOutput, 'base64', 'utf8');
      let decipheredOutput = decipher.final('utf8');
    */
    user.save(function (err) {
        if (err) {
            console.error(err);
            res.json({
                result: 0
            });
            return;
        }
        console.log("SYSTEM: Created succesfully!")
        res.json({
            result: 1
        });
    });
});


module.exports = router;