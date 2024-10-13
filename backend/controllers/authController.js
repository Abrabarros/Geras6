const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuário
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Verifica se o usuário já existe pelo email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já está em uso' });
    }

    // Cria um novo usuário
    const user = new User({ name, email, password });
    await user.save();

    // Gera o token JWT após o registro bem-sucedido
    const token = jwt.sign(
      { 
        id: user._id,       // ID do usuário
        name: user.name,    // Nome do usuário
        email: user.email   // Email do usuário
      },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // O token expira em 1 hora
    );

    // Retorna o token após o registro
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de usuário
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verifica se o usuário existe pelo email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    // Compara a senha fornecida com a senha armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });

    // Gera o token JWT com nome, email e ID do usuário no payload
    const token = jwt.sign(
      { 
        id: user._id,       // ID do usuário
        name: user.name,    // Nome do usuário
        email: user.email   // Email do usuário
      },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // O token expira em 1 hora
    );

    // Retorna o token
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
