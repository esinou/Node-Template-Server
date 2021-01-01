const express = require('express');
const router = express.Router();

var userAPI = require('../../api/userAPI');

router.route('/register').post(userAPI.register)
router.route('/login').post(userAPI.login)
router.route('/get').post(userAPI.getData)




router.route('/test').post(userAPI.test)




module.exports = router;
