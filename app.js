/**
 * @file app.js
 * @description Point d'entrée de l'API du Port de Plaisance Russell
 * @author Alassane Ndour
 */

// === IMPORTS ===
// Import du framework Express
const express = require('express');

// Charge les variables d'environnement depuis le fichier .env
require('dotenv').config();

// === INITIALISATION ===
// Création de l'application Express
const app = express();

// Récupération du port depuis le .env (ou 3000 par défaut)
const PORT = process.env.PORT || 3000;

// === MIDDLEWARES GLOBAUX ===
// Permet à Express de comprendre le JSON envoyé dans les requêtes
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