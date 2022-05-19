const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/login',adminController.login);
router.post('/login',adminController.postLogin);
router.get('/logout',adminController.logout);



router.get('/',adminController.index);

module.exports = router;
