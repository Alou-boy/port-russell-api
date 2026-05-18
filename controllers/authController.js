/**
 * @file controllers/authController.js
 * @description Authentification (login/logout)
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Connexion utilisateur
 * @route POST /login
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion utilisateur (génère un token JWT)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: alou@port-russell.fr
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie - retourne le token
 *       401:
 *         description: Identifiants invalides
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.cookie('token', token, { httpOnly: true, maxAge: 24*60*60*1000 });
        res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: { id: user._id, email: user.email, username: user.username }
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

/**
 * Déconnexion
 * @route GET /logout
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnexion utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Déconnexion réussie' });
};