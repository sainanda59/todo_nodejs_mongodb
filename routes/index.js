const express = require('express');
const homeContoller  = require('../controllers/home_controller');

const router = express.Router();

router.get('/',homeContoller.home);

module.exports = router;