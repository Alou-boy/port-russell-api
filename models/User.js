/**
 * @file models/User.js
 * @description Modèle Mongoose pour les utilisateurs de la capitainerie
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Schéma Mongoose représentant un utilisateur
 * @property {String} username - Nom d'utilisateur
 * @property {String} email - Adresse email (unique)
 * @property {String} password - Mot de passe haché avec bcrypt
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Le nom d\'utilisateur est obligatoire'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'L\'email est obligatoire'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'L\'email n\'est pas valide']
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire'],
        minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
    }
}, { timestamps: true });

/**
 * Middleware pre-save : hash automatiquement le password avant enregistrement
 * @function pre-save
 */
userSchema.pre('save', async function() {
    // Si le password n'a pas été modifié, on skip
    if (!this.isModified('password')) return;
    // Sinon on hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Méthode pour comparer un password en clair avec le hash stocké
 * (utilisée plus tard pour le login)
 * @param {String} plainPassword - Le mot de passe à vérifier
 * @returns {Promise<Boolean>}
 */
userSchema.methods.comparePassword = function(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);