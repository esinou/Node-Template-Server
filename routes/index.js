const express = require('express');
const router = express.Router();

const mongoose = require('../database/mongoose')

var db = mongoose.connection;

var userRoutes = require('./sub-routes/userRoutes');

router.use('/user', userRoutes)

module.exports = router;
