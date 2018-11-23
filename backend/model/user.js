const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
})

// create new User document
User.statics.create = function (username, password) {
    console.log("2차 생성 이름, 패스워드: " + username + ' ' + password)

    const user = new this({
        username,
        password
    })

    // return the Promise
    return user.save(err => {
        console.log(err)
        if (err) return handledError(err)
    })
}

// find one user by using username
User.statics.findOneByUsername = function (username) {
    console.log('1차 중복검사 find함수: ' + username)
    return this.findOne({
        username
    }).exec()
}


// verify the password of the User documment
User.methods.verify = function (password) {
    return this.password === password
}

User.methods.assignAdmin = function () {
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('User', User)