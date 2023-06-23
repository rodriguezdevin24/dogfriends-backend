const express = require('express');
const router = express.Router();
const dogController = require('../controllers/dogcontroller.js');
// const verifyAuth = require('../middlewares/veryAuth.js');

router.get('/dogs', dogController.getDogs); //Working both
router.get('/dogs/:id', dogController.getDogById); //Working both
//Make route to get Dogs by Owner ID and controller for it
router.get('/dogs/owner/:id', dogController.getDogByOwnerId); 
router.post('/dogs', dogController.createDog); //Working
router.put('/dogs/:id', dogController.updateDog); //Working
router.delete('/dogs/:id', dogController.deleteDog); //Working

module.exports = router;