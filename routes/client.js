const express = require('express');
const router = express.Router();
const {} = require("../models");
const AppError = require('../middlewares/AppError');
const asyncHandler = require('../middlewares/asyncHandler');

// POST /api/clients - Créer un nouveau client
router.post('/', asyncHandler(async (req, res, next) => {
  const client = await Client.create(req.body);
  res.status(201).json({
    success: true,
    data: client
  });
}));

// GET /api/clients - Lister tous les clients (avec pagination)
router.get('/', asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  if (page < 1 || limit < 1) {
    throw new AppError('Les paramètres de pagination sont invalides', 400);
  }

  const { count, rows } = await Client.findAndCountAll({
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });

  res.json({
    success: true,
    data: rows,
    pagination: {
      total: count,
      page,
      pages: Math.ceil(count / limit),
      limit
    }
  });
}));

// GET /api/clients/:id - Récupérer un client spécifique
router.get('/:id', asyncHandler(async (req, res, next) => {
  const client = await db.Client.findByPk(req.params.id, {
    include: [
      {through: 'Reservations', as: 'reservations'}
    ]
  });

  if (!client) {
    throw new AppError('Client non trouvé', 404);
  }

  res.json({
    success: true,
    data: client
  });
}));

// PUT /api/clients/:id - Mettre à jour un client
router.put('/:id', asyncHandler(async (req, res, next) => {
  const client = await Client.findByPk(req.params.id);
  
  if (!client) {
    throw new AppError('Client non trouvé', 404);
  }

  await client.update(req.body);
  
  res.json({
    success: true,
    data: client
  });
}));

// DELETE /api/clients/:id - Supprimer un client
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const client = await Client.findByPk(req.params.id);
  
  if (!client) {
    throw new AppError('Client non trouvé', 404);
  }

  await client.destroy();
  
  res.json({
    success: true,
    message: 'Client supprimé avec succès'
  });
}));

module.exports = router;