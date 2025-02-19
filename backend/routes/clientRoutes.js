const express = require('express');
const { searchClient, iniciateService } = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware, searchClient);
router.post('/', authMiddleware, iniciateService);

module.exports = router;
