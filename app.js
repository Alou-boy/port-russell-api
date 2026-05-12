/**
 * @file app.js
 * @description Point d'entrée de l'API du Port de Plaisance Russell
 * @author Alassane Ndour
 */

// === IMPORTS ===
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

// Import des routers
const catwaysRouter = require('./routes/catways');   // ⬅️ AJOUT 1

// === INITIALISATION ===
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// === MIDDLEWARES GLOBAUX ===
app.use(express.json());

// === ROUTES ===
app.get('/', (req, res) => {
    res.send('🚢 Bienvenue sur l\'API du Port de Plaisance Russell !');
});

// Branchement du router catways sur /catways
app.use('/catways', catwaysRouter);   // ⬅️ AJOUT 2

// === LANCEMENT DU SERVEUR ===
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
