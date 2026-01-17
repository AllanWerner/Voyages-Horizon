const express = require('express');
const router = express.Router();
const { Destination, Voyage, Hebergement, Activite } = require('../models');
const AppError = require('../middlewares/AppError');
const asyncHandler = require('../middlewares/asyncHandler');

// POST /api/destinations - Créer une nouvelle destination
router.post('/', asyncHandler(async (req, res, next) => {
  const destination = await Destination.create(req.body);
  
  res.status(201).json({
    success: true,
    data: destination
  });
}));

// GET /api/destinations - Lister toutes les destinations
router.get('/', asyncHandler(async (req, res, next) => {
  const destinations = await Destination.findAll({
    where: { isActive: true },
    order: [['nom', 'ASC']]
  });
  
  res.json({
    success: true,
    count: destinations.length,
    data: destinations
  });
}));

// GET /api/destinations/:id - Récupérer une destination avec ses voyages, hébergements et activités
router.get('/:id', asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const destination = await Destination.findByPk(id, {
    include: [
      { model: Voyage, as: 'voyages', attributes: [] },
      { model: Hebergement, as: 'hebergements', attributes: [] },
      { model: Activite, as: 'activites', attributes: [] }
    ]
  });

  if (!destination) {
    throw new AppError('Destination non trouvée', 404);
  }

  res.json({
    success: true,
    data: destination
  });
}));

// GET /api/destinations/:id/voyages - Récupérer tous les voyages d'une destination
router.get('/:id/voyages', asyncHandler(async (req, res, next) => {
  // Vérifier que la destination existe
  const id = parseInt(req.params.id);
  const destination = await Destination.findByPk(id);
  if (!destination) {
    throw new AppError('Destination non trouvée', 404);
  }

  const voyages = await Voyage.findAll({
    where: { destinationId: req.params.id },
    include: [{ model: Destination, as: 'destination', attributes: [] }]
  });

  res.json({
    success: true,
    count: voyages.length,
    data: voyages
  });
}));

// GET /api/destinations/continent/:continent - Lister par continent
router.get('/continent/:continent', asyncHandler(async (req, res, next) => {
  const continentsValides = ['Europe', 'Asie', 'Afrique', 'Amérique', 'Océanie'];
  
  if (!continentsValides.includes(req.params.continent)) {
    throw new AppError('Continent invalide', 400);
  }

  const destinations = await Destination.findAll({
    where: { 
      continent: req.params.continent,
      isActive: true 
    },
    order: [['nom', 'ASC']]
  });

  res.json({
    success: true,
    count: destinations.length,
    data: destinations
  });
}));

module.exports = router;