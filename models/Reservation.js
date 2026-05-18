/**
 * @file models/Reservation.js
 * @description Modèle Mongoose pour les réservations de catways
 */

const mongoose = require('mongoose');

/**
 * Schéma Mongoose représentant une réservation de catway
 * @property {Number} catwayNumber - Numéro du catway réservé
 * @property {String} clientName - Nom du client
 * @property {String} boatName - Nom du bateau
 * @property {Date} startDate - Date de début de réservation
 * @property {Date} endDate - Date de fin de réservation
 */
const reservationSchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Le numéro de catway est obligatoire']
    },
    clientName: {
        type: String,
        required: [true, 'Le nom du client est obligatoire'],
        trim: true
    },
    boatName: {
        type: String,
        required: [true, 'Le nom du bateau est obligatoire'],
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, 'La date de début est obligatoire']
    },
    endDate: {
        type: Date,
        required: [true, 'La date de fin est obligatoire']
    }
}, { timestamps: true });
module.exports = mongoose.model('Reservation', reservationSchema);