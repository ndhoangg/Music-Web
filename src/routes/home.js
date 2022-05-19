const express = require('express');
const router = express.Router();

const homeController = require('../controllers/HomeController');

router.get('/test',homeController.test);
router.get('/',homeController.index);

module.exports = router;
