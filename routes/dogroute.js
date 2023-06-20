const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogcontroller.js');
const verifyAuth = require('../middlewares/veryAuth.js');

router.get('/dogs', dogController.getDogs); //Working both
router.get('/dogs/:id', dogController.getDogById); //Working both
router.post('/dogs', verifyAuth, dogController.createDog); //Working
router.put('/dogs/:id', verifyAuth, dogController.updateDog); //Working
router.delete('/dogs/:id', verifyAuth, dogController.deleteDog); //Working

module.exports = router;