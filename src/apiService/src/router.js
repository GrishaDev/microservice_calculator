
const express = require('express');
const router = express.Router();
const wa = require('./utils/wrapAsync');
const Controller = require('./controller');
const { isValidCalculation, isValidDivision } = require('./validator');

router.get('/health', wa(Controller.health));

router.get('/calculation', wa(Controller.getCalculations));
router.get('/calculation/:id', wa(Controller.getCalculation));
router.delete('/calculation/:id', wa(Controller.removeCalculation));

router.post('/calculation/addition', isValidCalculation, wa(Controller.addAddition));
router.post('/calculation/subtraction', isValidCalculation, wa(Controller.addSubtraction));
router.post('/calculation/multiplication', isValidCalculation, wa(Controller.addMultiplication));
router.post('/calculation/division', isValidCalculation, isValidDivision, wa(Controller.addDivision));

module.exports = router;