/**
 * @file config/db.js
 * @description Configuration de la connexion à MongoDB via Mongoose
 */

const mongoose = require('mongoose');

/**
 * Établit la connexion à la base de données MongoDB
 * Utilise l'URI définie dans la variable d'environnement MONGO_URI
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connecté à MongoDB');
    } catch (err) {
        console.error('❌ Erreur de connexion MongoDB :', err.message);
        // On arrête le serveur si la BDD ne se connecte pas
        process.exit(1);
    }
};

module.exports = connectDB;