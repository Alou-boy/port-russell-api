const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

// ⬇️ AJOUT 1 : import du router des réservations
const reservationsRouter = require('./reservations');

// ⬇️ AJOUT 2 : branchement comme sous-ressource des catways
router.use('/:id/reservations', reservationsRouter);

// Routes CRUD pour les catways (inchangées)
router.get('/', catwayController.getAllCatways);
router.get('/:id', catwayController.getCatwayById);
router.post('/', catwayController.createCatway);
router.put('/:id', catwayController.updateCatway);
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;