const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');


const reservationsRouter = require('./reservations')
router.use('/:id/reservations', reservationsRouter);
const { authMiddleware } = require('../middlewares/auth');
router.use(authMiddleware); 

// Routes CRUD pour les catways (inchangées)
router.get('/', catwayController.getAllCatways);
router.get('/:id', catwayController.getCatwayById);
router.post('/', catwayController.createCatway);
router.put('/:id', catwayController.updateCatway);
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;