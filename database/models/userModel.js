const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userModel = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
        minlength:1,
        validate:{
            validator: validator.isEmail,
            message: "{VALUE} is not an email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        trim: true
    },
    accountType: {
        type: Number,
        required: true,
    }
},
{
    timestamps: { 
        createdAt: 'created_at' 
    }
})

userModel.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) {
        console.log("[NOM PROJET] error user is modified".red);
        return next();
    }
    bcrypt.genSalt(12, (err, salt) => {
        if (err) {
            console.log("[NOM PROJET] error password crypt".red);
            return Promise.reject(err);
        }
        bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            if (err) {
                console.log("[NOM PROJET] error password hash".red);
                return Promise.reject(err);
            }
            user.password = hashedPassword;
            next();
        });
    });
});

module.exports = mongoose.model('User', userModel);
