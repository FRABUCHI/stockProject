const jwt = require('jsonwebtoken')
const User = require('../../../model/user')

exports.register = (req, res) => {
    console.log('SYSTEM: req')
    console.log(req.body)
    
    const {
        id,
        name,
        password,
        email
    } = req.body
    
    // create a new user if does not exist
    const create = (user) => {
        if (user) {
            throw new Error('id exists')
        }
        else {
            return User.create(
                id,
                name,
                password,
                email
            )
        }
    }

    // respond to the client
    const respond = () => {
        console.log('SYSTEM: Registered successfully')
        res.json({
            message: 'registered successfully',
            //admin: isAdmin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        console.log('SYSTEM: '+error)
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByUsername(id)
        .then(create)
        .then(respond)
        .catch(onError)
}

exports.login = (req, res) => {
    const {id, password} = req.body
    console.log(req.body)
    const secret = req.app.get('jwt-secret')

    // check the user info & generate the jwt
        // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(user.verify(password)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            id: user.id,
                            admin: user.admin
                        }, 
                        secret, 
                        {
                            expiresIn: '7d',//토큰관련
                            issuer: 'syl.com',//이슈에 필요한 사이트
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    // respond the token 
    const respond = (token) => {
        console.log('SYSTEM: logged in successfully')
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    User.findOneByUsername(id)
    .then(check)
    .then(respond)
    .catch(onError)
}

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}

exports.logout = (req, res) => {
    console.log("User is logged out.")
    res.send("SYSTEM: User is logged out.")
}