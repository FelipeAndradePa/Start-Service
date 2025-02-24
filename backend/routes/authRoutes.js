const express = require('express');
const { register, login, verify, getName } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authMiddleware, verify);
router.get('/getName/:user', getName);
 
module.exports = router;

