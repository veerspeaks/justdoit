const express = require('express');
const router = express.Router();
const exampleController = require('../controller/controller');

router.get('/', exampleController.getDashboard);
router.post('/createtodo', exampleController.createtodo);


module.exports = router;