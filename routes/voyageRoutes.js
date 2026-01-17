const express = require('express');
const router = express.Router();
const { Voyage, Destination, Activite, Client, Reservation, VoyageActivite } = require('../models');
const { Op } = require('sequelize');
const AppError = require('../middlewares/AppError');
const asyncHandler = require('../middlewares/asyncHandler');

// POST /api/voyages - Créer un nouveau voyage
router.post('/', asyncHandler(async (req, res) => {
  const voyage = await Voyage.create(req.body);
  
  res.status(201).json({
    success: true,
    data: voyage
  });
}));

// GET /api/voyages - Lister tous les voyages avec filtres
router.get('/', asyncHandler(async (req, res) => {
//Récupération et destructuration de quelques filtres qui pourraient être intéressants
  const { dateMin, dateMax, prixMin, prixMax, destination, typeVoyage } = req.query;
  const where = {};

// Mise en place des filtres 

  // Récupère les voyages dont la date de départ est supérieur ou égal à dateMin(passée dans la requête)
  if (dateMin) {
    const dateMinParsed = new Date(dateMin);
    if (isNaN(dateMinParsed.getTime())) {
      throw new AppError('Format de dateMin invalide', 400);
    }
    where.dateDepart = { [Op.gte]: dateMinParsed };
  }
  
   // Récupère les voyages dont la date de départ est inférieur ou égal à dateMax(passée dans la requête)
  if (dateMax) {
    const dateMaxParsed = new Date(dateMax);
    if (isNaN(dateMaxParsed.getTime())) {
      throw new AppError('Format de dateMax invalide', 400);
    }
    where.dateDepart = { ...where.dateDepart, [Op.lte]: dateMaxParsed };
  }
  
   // Récupère les voyages dont le prix de base est supérieur ou égal à prixMin(passée dans la requête)
  if (prixMin) {
    const prixMinNum = parseFloat(prixMin);
    if (isNaN(prixMinNum) || prixMinNum < 0) {
      throw new AppError('prixMin doit être un nombre positif', 400);
    }
    where.prixBase = { [Op.gte]: prixMinNum };
  }
  
   // Récupère les voyages dont le prix de base est inférieur ou égal à prixMax(passée dans la requête)
  if (prixMax) {
    const prixMaxNum = parseFloat(prixMax);
    if (isNaN(prixMaxNum) || prixMaxNum < 0) {
      throw new AppError('prixMax doit être un nombre positif', 400);
    }
    where.prixBase = { ...where.prixBase, [Op.lte]: prixMaxNum };
  }
  
  // Récupère les voyages ayant la même destination
  if (destination) {
    const destId = parseInt(destination);
    if (isNaN(destId)) {
      throw new AppError('destination doit être un ID valide', 400);
    }
    where.destinationId = destId;
  }
  
  // Récupère les voyages ayant le même type
  if (typeVoyage) {
    where.typeVoyage = typeVoyage;
  }

  const voyages = await Voyage.findAll({
    where,
    order: [['dateDepart', 'ASC']]
  });

  res.json({
    success: true,
    count: voyages.length,
    data: voyages
  });
}));

// GET /api/voyages/:id - Récupérer un voyage avec sa destination et activités incluse
router.get('/:id', asyncHandler(async (req, res) => {
  const voyageId = parseInt(req.params.id);
  if (isNaN(voyageId)) {
    throw new AppError('ID de voyage invalide', 400);
  }

  const voyage = await Voyage.findByPk(voyageId, {
    include: [
      { model: Destination, as: 'destination', attributes: [] },
      { 
        model: Activite, 
        as: 'activites',
        through: { 
          attributes: ['jour', 'ordre', 'estInclus'] 
        }
      }
    ]
  });

  if (!voyage) {
    throw new AppError('Voyage non trouvé', 404);
  }

  res.json({
    success: true,
    data: voyage
  });
}));

// POST /api/voyages/:id/reserver - Réserver un voyage
router.post('/:id/reserver', asyncHandler(async (req, res) => {
  const voyageId = parseInt(req.params.id);
  const { clientId, nombrePersonnes } = req.body;

  if (!clientId || !nombrePersonnes) {
    throw new AppError('clientId et nombrePersonnes sont requis', 400);
  }

  const nombrePersonnesNum = parseInt(nombrePersonnes);
  if (isNaN(nombrePersonnesNum) || nombrePersonnesNum <= 0) {
    throw new AppError('nombrePersonnes doit être un nombre positif', 400);
  }

  const voyage = await Voyage.findByPk(voyageId);
  if (!voyage) {
    throw new AppError('Voyage non trouvé', 404);
  }

  if (voyage.placesDisponibles < nombrePersonnesNum) {
    throw new AppError(
      `Seulement ${voyage.placesDisponibles} places disponibles`,
      400
    );
  }

  const client = await Client.findByPk(clientId);
  if (!client) {
    throw new AppError('Client non trouvé', 404);
  }

  const prixTotal = parseFloat(voyage.prixBase) * nombrePersonnesNum;

  const reservation = await Reservation.create({
    clientId,
    voyageId: voyage.id,
    nombrePersonnes: nombrePersonnesNum,
    prixTotal,
    statut: 'Confirmée'
  });

  await voyage.decrement('placesDisponibles', { by: nombrePersonnesNum });

  res.status(201).json({
    success: true,
    data: reservation,
    message: 'Réservation créée avec succès',
    metadata: {
      placesRestantes: voyage.placesDisponibles - nombrePersonnesNum
    }
  });
}));

// GET /api/voyages/prochains - Voyages dans les 30 prochains jours
router.get('/filter/prochains', asyncHandler(async (req, res) => {
  const dateAujourdhui = new Date();
  const dateDans30Jours = new Date();
  dateDans30Jours.setDate(dateDans30Jours.getDate() + 30);

  const voyages = await Voyage.findAll({
    where: {
      dateDepart: {
        [Op.between]: [dateAujourdhui, dateDans30Jours]
      },
      placesDisponibles: { [Op.gt]: 0 }
    },
    include: [{ model: Destination, as: 'destination', attributes: [] }],
    order: [['dateDepart', 'ASC']]
  });

  res.json({
    success: true,
    count: voyages.length,
    period: {
      from: dateAujourdhui.toISOString().split('T')[0],
      to: dateDans30Jours.toISOString().split('T')[0]
    },
    data: voyages
  });
}));

module.exports = router;