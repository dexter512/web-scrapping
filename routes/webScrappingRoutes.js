const express = require('express');
const webScrappingController = require('../controllers/webScrappingController');

const router=express.Router();

router.get('/getWebScrappingData',webScrappingController.getWebScrappingData);

module.exports=router;