const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const User = new Schema({
    id: String,
    password: String,
    name: String,
    email: String,
    create_date: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    }, 
    favorites: [{
        company: String
    }]
})

// create new User document
User.statics.create = function (id, name, password, email) {
    console.log("SYSTEM: 2차 유저 생성 = " + id + ' ' + name + ' ' + password + ' ' + email)

    const encrypted = crypto.createHmac('sha1', config.secret)
    .update(password)
    .digest('base64')

    const user = new this({
        id,
        name,
        password: encrypted,
        email
    })

    // return the Promise
    return user.save(err => {
        console.log(err)
        if (err) return handledError(err)
    })
}

// find one user by using username
User.statics.findOneByUsername = function (id) {
    console.log('SYSTEM: 1차 id 중복검사 = ' + id)
    return this.findOne({
        id
    }).exec()
}

// verify the password of the User documment
User.methods.verify = function (password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
        .update(password)
        .digest('base64')
    
    return this.password === encrypted
}

module.exports = mongoose.model('User', User, 'userList')