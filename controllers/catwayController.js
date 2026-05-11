/**
 * @file controllers/catwayController.js
 * @description Logique métier pour les opérations CRUD sur les catways
 */

const Catway = require('../models/Catway');

/**
 * Récupère la liste de tous les catways
 * @route GET /catways
 * @returns {Array} Liste des catways
 */
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.status(200).json(catways);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

/**
 * Récupère un catway par son numéro (catwayNumber)
 * @route GET /catways/:id
 * @param {string} req.params.id - Le numéro du catway
 */
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }
        res.status(200).json(catway);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

/**
 * Crée un nouveau catway
 * @route POST /catways
 * @param {Object} req.body - Données du catway (catwayNumber, catwayType, catwayState)
 */
exports.createCatway = async (req, res) => {
    try {
        const newCatway = await Catway.create(req.body);
        res.status(201).json(newCatway);
    } catch (err) {
        res.status(400).json({ message: 'Erreur de création', error: err.message });
    }
};

/**
 * Modifie l'état d'un catway existant
 * Seul catwayState est modifiable (catwayNumber et catwayType sont immuables)
 * @route PUT /catways/:id
 */
exports.updateCatway = async (req, res) => {
    try {
        // On extrait UNIQUEMENT catwayState du body (sécurité)
        const { catwayState } = req.body;

        const updated = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
            { catwayState },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Erreur de modification', error: err.message });
    }
};

/**
 * Supprime un catway par son numéro
 * @route DELETE /catways/:id
 */
exports.deleteCatway = async (req, res) => {
    try {
        const deleted = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        if (!deleted) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }
        res.status(200).json({ message: 'Catway supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};