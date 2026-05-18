const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Page d'accueil
router.get('/', (req, res) => {
    res.render('home');
});

// Tableau de bord (protégé côté logique : si pas de token, redirige)
router.get('/dashboard', async (req, res) => {
    const token = req.cookies && req.cookies.token;
    if (!token) return res.redirect('/');
    // Récupération des réservations en cours
    const today = new Date();
    const reservations = await Reservation.find({
        startDate: { $lte: today },
        endDate: { $gte: today }
    });
    res.render('dashboard', { reservations, today });
});


//router.get('/views/catways', ...); 
//router.get('/views/catways/create', ...);
//router.get('/views/catways/:id', ...);
//router.get('/views/catways/:id/edit', ...);

module.exports = router;