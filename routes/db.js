var router = require('express').Router();
const db = require('../database/db')
const operator = require('../database/operator')


// Routes
router.get('/', db.getUserById);
router.post('/quotation', db.getPlans);




module.exports = router;