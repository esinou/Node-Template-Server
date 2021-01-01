const express = require('express');
const router = express.Router();
const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');

exports.register = function (req, res) {
    const { 
        email,
        password,
        firstName,
        lastName,
        username,
        phone,
        accountType
    } = req.body;
    let newUser = new User({
        email,
        password,
        firstName,
        lastName,
        username,
        phone,
        accountType
    });

    newUser
    .save()
    .then(user => {
        if (!user) {
            console.log("[NOM PROJET] error register utilisateur".red, err);
            return res.status(400).send();
        }
        console.log("[NOM PROJET] register utilisateur".green, newUser);
        // sendConfirmationEmail(user);
        return res.status(201).send(user._id);
    })
    .catch(err => {
        console.log("[NOM PROJET] error register utilisateur".red, err);
        if (err)
            return res.status(400).send({ error:err });
        return res.status(400).send();
    });
};

exports.login = function (req, res) {
    const { 
        emailOrUsername, 
        password 
    } = req.body;
    
    if (!emailOrUsername || !password)
        return res.status(400).send({ error:err });
    User
    .findOne({email: emailOrUsername})
    .then((user) => {
        if (!user) {
            User
            .findOne({username: emailOrUsername})
            .then((user) => {
                if (!user) {
                    return res.status(400).send({ error });
                } else {
                    bcrypt
                    .compare(password, user.password)
                    .then(match => {
                        if (!match)
                            return res.status(401).send(); 
                        return res.status(201).send(user._id);
                    })
                    .catch(err => {
                        if (error)
                            return res.status(400).send({ error });
                    });
                }
            })
            .catch(error => {
                return res.status(400).send({ error });
            })
        } else {
            bcrypt
            .compare(password, user.password)
            .then(match => {
                if (!match)
                    return res.status(401).send(); 
                return res.status(201).send(user._id);
            })
            .catch(err => {
                if (error)
                    return res.status(400).send({ error });
            });
        }
    })
    .catch(err => {
        if (error)
            return res.status(400).send({ error });
    });
};

exports.getData = function (req, res) {
    const { 
        userId,
    } = req.body;
    
    if (!userId)
        return res.status(400).send({ error:err });
    User
    .findOne({_id: userId})
    .then((user) => {
        if (!user) {
            return res.status(400).send();
        } else {
            return res.status(201).send({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                phone: user.phone
            });
        }
    })
    .catch(err => {
        if (error)
            return res.status(400).send({ error });
    });
};

exports.test = function (req, res) {
    return res.status(200).send();
};