/**
 * @file app.js
 * @description Point d'entrée de l'API du Port de Plaisance Russell
 * @author Alassane Ndour
 */

// === IMPORTS ===
const express = require('express');
require('dotenv').config();

// Import de la fonction de connexion à MongoDB
const connectDB = require('./config/db');

// === INITIALISATION ===
const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données MongoDB
connectDB();

// === MIDDLEWARES GLOBAUX ===
app.use(express.json());

// === ROUTES ===
/**
 * Route d'accueil de l'API
 * @route GET /
 * @returns {string} Message de bienvenue
 */
app.get('/', (req, res) => {
    res.send('🚢 Bienvenue sur l\'API du Port de Plaisance Russell !');
});

// === LANCEMENT DU SERVEUR ===
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
}); 