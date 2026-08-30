const express = require('express');
const { verifyToken } = require('./auth');

const router = express.Router();

// Ruta protegida
router.get('/dashboard', verifyToken, (req, res) => {
  // Simulando datos de la base de datos
  const dashboardData = {
    stats: [
      { label: 'Usuarios Totales', value: '1,240', change: '+12%' },
      { label: 'Ventas Mensuales', value: '$45,200', change: '+5.4%' },
      { label: 'Sesiones Activas', value: '320', change: '-2%' },
      { label: 'Nuevos Clientes', value: '84', change: '+22%' }
    ],
    recentActivities: [
      { id: 1, action: 'Nuevo usuario registrado', time: 'hace 5 minutos' },
      { id: 2, action: 'Compra finalizada ($150.00)', time: 'hace 1 hora' },
      { id: 3, action: 'Actualización de perfil', time: 'hace 3 horas' },
      { id: 4, action: 'Ticket de soporte creado', time: 'hace 1 día' }
    ]
  };

  res.json({
    success: true,
    data: dashboardData,
    user: req.user // El usuario inyectado por verifyToken
  });
});

module.exports = router;
