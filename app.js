/**
 * @file app.js
 * @description Point d'entrée de l'API du Port de Plaisance Russell
 * @author Alassane Ndour
 */

// === IMPORTS ===
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

// Import des routers
const catwaysRouter = require('./routes/catways');   
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const viewsRouter = require('./routes/views');
const swaggerSpec = require('./config/swagger');


// === INITIALISATION ===
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// === MIDDLEWARES GLOBAUX ===
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// === ROUTES ===
app.get('/', (req, res) => {
    res.send('🚢 Bienvenue sur l\'API du Port de Plaisance Russell !');
});
app.use('/', authRouter);

// Branchement du router catways sur /catways
app.use('/catways', catwaysRouter);   
app.use('/users', usersRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', viewsRouter);


// === LANCEMENT DU SERVEUR ===
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

// Config EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




