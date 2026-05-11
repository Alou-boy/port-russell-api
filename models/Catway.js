/**
 * @file models/Catway.js
 * @description Modèle Mongoose pour les catways (places d'amarrage du port)
 */

const mongoose = require('mongoose');

/**
 * Schéma Mongoose représentant un catway
 * @property {Number} catwayNumber - Numéro unique du catway
 * @property {String} catwayType - Type du catway : "long" ou "short"
 * @property {String} catwayState - Description de l'état de la passerelle
 */
const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Le numéro de catway est obligatoire'],
        unique: true
    },
    catwayType: {
        type: String,
        required: [true, 'Le type de catway est obligatoire'],
        enum: {
            values: ['long', 'short'],
            message: 'Le type doit être "long" ou "short"'
        }
    },
    catwayState: {
        type: String,
        required: [true, 'L\'état du catway est obligatoire'],
        trim: true
    }
}, {
    // Ajoute automatiquement les champs createdAt et updatedAt
    timestamps: true
});

module.exports = mongoose.model('Catway', catwaySchema);