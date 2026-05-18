/**
 * @file routes/users.js
 * @description Routes Express pour les utilisateurs
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');
 

router.get('/', userController.getAllUsers);
router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/:email', userController.updateUser);
router.delete('/:email', userController.deleteUser);
router.use(authMiddleware);

module.exports = router;