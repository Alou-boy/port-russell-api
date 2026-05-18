/**
 * @file middlewares/auth.js
 * @description Middleware de vérification JWT
 */
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    try {
        let token = req.cookies && req.cookies.token;
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ message: 'Accès refusé : token manquant' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};