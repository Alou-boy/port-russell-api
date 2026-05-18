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
/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catways récupérée
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
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
/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son numéro
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Catway non trouvé
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
/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: Catway créé
 *       400:
 *         description: Données invalides
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
/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Modifie l'état d'un catway existant
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numéro du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CatwayState'
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Catway non trouvé
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
/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catway supprimé
 *       404:
 *         description: Catway non trouvé
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