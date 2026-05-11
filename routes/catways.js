/**
 * @file routes/catways.js
 * @description Définition des routes Express pour la ressource "catways"
 */

const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

// === ROUTES CRUD pour les catways ===

// GET /catways → liste tous les catways
router.get('/', catwayController.getAllCatways);

// GET /catways/:id → récupère un catway par son numéro
router.get('/:id', catwayController.getCatwayById);

// POST /catways → crée un nouveau catway
router.post('/', catwayController.createCatway);

// PUT /catways/:id → modifie l'état d'un catway
router.put('/:id', catwayController.updateCatway);

// DELETE /catways/:id → supprime un catway
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;