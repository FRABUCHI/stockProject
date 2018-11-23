const router = require('express').Router()
const controller = require('./auth.controller')
const User = require('../../../model/user')
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
    console.log('req: ' + req.body.username)
    const {username, password} = req.body
    let newUser = null

    // create a new user if does not exist
    const create = (user) => {
        if (user) {
            throw new Error('username exists')
        } else {
            return User.create(username, password)
        }
    }

    // count the number of the user
    //const count = (user) => {
    //    newUser = user
    //    return User.count({}).exec()
    //}

    //// assign admin if count is 1
    //const assign = (count) => {
    //    if (count === 1) {
    //        return newUser.assignAdmin()
    //    } else {
    //        // if not, return a promise that returns false
    //        return Promise.resolve(false)
    //    }
    //}

    // respond to the client
    const respond = () => {
        res.json({
            message: 'registered successfully',
            //admin: isAdmin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByUsername(username)
        .then(create)
        //.then(count)
        //.then(assign)
        .then(respond)
        .catch(onError)
})



module.exports = router