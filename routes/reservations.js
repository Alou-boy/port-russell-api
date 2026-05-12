/**
 * @file routes/reservations.js
 * @description Routes Express pour les réservations (sous-ressource de catways)
 */

const express = require('express');
// mergeParams: true => permet d'accéder à req.params.id du router parent (catways)
const router = express.Router({ mergeParams: true });
const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getReservationsByCatway);
router.get('/:idReservation', reservationController.getReservationById);
router.post('/', reservationController.createReservation);
router.put('/:idReservation', reservationController.updateReservation);
router.delete('/:idReservation', reservationController.deleteReservation);

module.exports = router;