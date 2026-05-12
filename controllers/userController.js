/**
 * @file controllers/userController.js
 * @description Logique métier pour les opérations CRUD sur les utilisateurs
 */

const User = require('../models/User');

/**
 * Liste tous les utilisateurs (sans renvoyer les passwords)
 * @route GET /users
 */
exports.getAllUsers = async (req, res) => {
    try {
        // .select('-password') exclut le champ password de la réponse
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

/**
 * Récupère un utilisateur par son email
 * @route GET /users/:email
 */
exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

/**
 * Crée un nouvel utilisateur
 * Le password est automatiquement haché par le middleware pre-save du modèle
 * @route POST /users
 */
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        // On retire le password de la réponse
        const userToReturn = newUser.toObject();
        delete userToReturn.password;
        res.status(201).json(userToReturn);
    } catch (err) {
        res.status(400).json({ message: 'Erreur de création', error: err.message });
    }
};

/**
 * Modifie un utilisateur par email
 * Le password est re-haché automatiquement si modifié
 * @route PUT /users/:email
 */
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        // On met à jour les champs présents dans le body
        if (req.body.username) user.username = req.body.username;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;
        await user.save(); // déclenche le hook pre-save (hash si password modifié)
        const userToReturn = user.toObject();
        delete userToReturn.password;
        res.status(200).json(userToReturn);
    } catch (err) {
        res.status(400).json({ message: 'Erreur de modification', error: err.message });
    }
};

/**
 * Supprime un utilisateur par email
 * @route DELETE /users/:email
 */
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.findOneAndDelete({ email: req.params.email });
        if (!deleted) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};