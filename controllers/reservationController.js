/**
 * @file controllers/reservationController.js
 * @description Logique métier pour les réservations (sous-ressource de catways)
 */

const Reservation = require('../models/Reservation');

/**
 * Liste toutes les réservations d'un catway donné
 * @route GET /catways/:id/reservations
 */
/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Liste toutes les réservations d'un catway
 *     tags: [Reservations]
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
 *         description: Liste des réservations
 */
exports.getReservationsByCatway = async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

/**
 * Récupère une réservation précise
 * @route GET /catways/:id/reservations/:idReservation
 */
/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Récupère une réservation précise
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *       404:
 *         description: Réservation non trouvée
 */
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({
            _id: req.params.idReservation,
            catwayNumber: req.params.id
        });
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

/**
 * Crée une nouvelle réservation pour le catway donné
 * @route POST /catways/:id/reservations
 */
/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Crée une nouvelle réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation créée
 *       400:
 *         description: Données invalides
 */
exports.createReservation = async (req, res) => {
    try {
        const { clientName, boatName, startDate, endDate } = req.body;
        // Validation custom des dates DANS le contrôleur
        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).json({
                message: 'Erreur de création',
                error: 'La date de fin doit être postérieure à la date de début'
            });
        }
        const newReservation = await Reservation.create({
            catwayNumber: req.params.id,
            clientName, boatName, startDate, endDate
        });
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: 'Erreur de création', error: err.message });
    }
};
/**
 * Modifie une réservation existante
 * @route PUT /catways/:id/reservations/:idReservation
 */
/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   put:
 *     summary: Modifie une réservation existante
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Réservation non trouvée
 */
exports.updateReservation = async (req, res) => {
    try {
        const updated = await Reservation.findOneAndUpdate(
            { _id: req.params.idReservation, catwayNumber: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Erreur de modification', error: err.message });
    }
};

/**
 * Supprime une réservation
 * @route DELETE /catways/:id/reservations/:idReservation
 */
/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Non trouvée
 */
exports.deleteReservation = async (req, res) => {
    try {
        const deleted = await Reservation.findOneAndDelete({
            _id: req.params.idReservation,
            catwayNumber: req.params.id
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json({ message: 'Réservation supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};