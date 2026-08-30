const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = 'super_secret_key_for_demo';

const DEMO_USER = {
  username: 'admin',
  password: 'password123',
  id: 1,
  name: 'Administrador Demo'
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    const token = jwt.sign(
      { id: DEMO_USER.id, username: DEMO_USER.username, name: DEMO_USER.name },
      SECRET_KEY,
      { expiresIn: '2h' }
    );
    return res.json({ 
      success: true, 
      token, 
      user: { id: DEMO_USER.id, username: DEMO_USER.username, name: DEMO_USER.name } 
    });
  }
  return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ success: false, message: 'Token requerido para acceder a esta ruta' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    req.user = user;
    next();
  });
};

module.exports = {
  router,
  verifyToken
};
