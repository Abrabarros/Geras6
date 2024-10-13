const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();

// Rota de registro
router.post('/register', registerUser);  // Certifique-se de que essa rota está aqui

// Rota de login
router.post('/login', loginUser);

module.exports = router;
