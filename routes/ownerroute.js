const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownercontroller.js');
const verifyAuth = require('../middlewares/veryAuth.js');
// const { default: verifyAuth } = require('../middlewares/veryAuth.js');
// const verifyAuth = require('../middlewares/veryAuth.js');

router.get('/owners', ownerController.getOwners); //Working both
router.get('/owners/:id', ownerController.getOwnerById); //Working both

router.put('/owners/:id', ownerController.updateOwner); //Working
router.delete('/owners/:id', ownerController.deleteOwner); //Working

module.exports = router;

// router.post()

// router.post

// router.get

// router.get