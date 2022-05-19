const express = require('express');
const router = express.Router();

const apiController = require('../controllers/ApiController');

router.get('/getInfoMusic/:id',apiController.getInfoMusic);
router.get('/getFullInfo/:id',apiController.getFullInfo);
router.get('/getWeekChart/:id',apiController.getWeekChart);
router.get('/getSectionPlaylist/:id',apiController.getSectionPlaylist);
router.get('/getDetailPlaylist/:id',apiController.getDetailPlaylist);
router.get('/getStreaming/:id',apiController.getStreaming);
router.get('/getLyric/:id',apiController.getLyric);
router.get('/getNewReleaseChart',apiController.getNewReleaseChart);
router.get('/getHome/:id',apiController.getHome);

module.exports = router;
