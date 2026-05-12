/**
 * @file controllers/reservationController.js
 * @description Logique métier pour les réservations (sous-ressource de catways)
 */

const Reservation = require('../models/Reservation');

/**
 * Liste toutes les réservations d'un catway donné
 * @route GET /catways/:id/reservations
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
exports.createReservation = async (req, res) => {
    try {
        const newReservation = await Reservation.create({
            catwayNumber: req.params.id,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
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