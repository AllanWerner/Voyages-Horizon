const express = require('express');
const router = express.Router();
const { Reservation, Client, Voyage, Destination } = require('../models');
const AppError = require('../middlewares/AppError');
const asyncHandler = require('../middlewares/asyncHandler');

// POST /api/reservations - Créer une réservation
router.post('/', asyncHandler(async (req, res) => {
  const { clientId, voyageId, nombrePersonnes } = req.body;

  if (!clientId || !voyageId || !nombrePersonnes) {
    throw new AppError('clientId, voyageId et nombrePersonnes sont requis', 400);
  }

  const nombrePersonnesNum = parseInt(nombrePersonnes);
  if (isNaN(nombrePersonnesNum) || nombrePersonnesNum <= 0) {
    throw new AppError('nombrePersonnes doit être un nombre positif', 400);
  }

  const voyage = await Voyage.findByPk(voyageId);
  if (!voyage) {
    throw new AppError('Voyage non trouvé', 404);
  }

  //Vérifie si le nombre de places demandées est disponible
  if (voyage.placesDisponibles < nombrePersonnesNum) {
    throw new AppError(
      `Seulement ${voyage.placesDisponibles} places disponibles`,
      400
    );
  }

  // Vérifier que le client existe
  const client = await Client.findByPk(clientId);
  if (!client) {
    throw new AppError('Client non trouvé', 404);
  }

  const prixTotal = parseFloat(voyage.prixBase) * nombrePersonnesNum;

  const reservation = await Reservation.create({
    clientId,
    voyageId,
    nombrePersonnes: nombrePersonnesNum,
    prixTotal,
    statut: 'En attente'
  });

  await voyage.decrement('placesDisponibles', { by: nombrePersonnesNum });

  res.status(201).json({
    success: true,
    data: reservation,
    message: 'Réservation créée avec succès'
  });
}));

// GET /api/reservations/client/:clientId - Réservations d'un client
router.get('/client/:clientId', asyncHandler(async (req, res) => {
  const clientId = parseInt(req.params.clientId);
  if (isNaN(clientId)) {
    throw new AppError('ID client invalide', 400);
  }

  // Vérifier que le client existe
  const client = await Client.findByPk(clientId);
  if (!client) {
    throw new AppError('Client non trouvé', 404);
  }

  const reservations = await Reservation.findAll({
    where: { clientId },
    include: [{ 
        model: Voyage, as: 'voyage', attributes: ['titre', 'prixBase','placesDisponibles'] ,
        include: [{ model: Destination, as: 'destination', attributes: ['nom', 'pays'] }],
    }],
    order: [['dateReservation', 'DESC']]
  });

  res.json({
    success: true,
    count: reservations.length,
    clientId,
    data: reservations
  });
}));

// PUT /api/reservations/:id/annuler - Annuler une réservation
router.put('/:id/annuler', asyncHandler(async (req, res) => {
  const reservationId = parseInt(req.params.id);
  if (isNaN(reservationId)) {
    throw new AppError('ID réservation invalide', 400);
  }

  const reservation = await Reservation.findByPk(reservationId, {
    include: [{ model: Voyage, as: 'voyage' }]
  });

  if (!reservation) {
    throw new AppError('Réservation non trouvée', 404);
  }

  if (reservation.statut === 'Annulée') {
    throw new AppError('Cette réservation est déjà annulée', 400);
  }

  await reservation.update({ statut: 'Annulée' });

  // Rendre les places disponibles
  await voyage.increment('placesDisponibles', { 
    by: reservation.nombrePersonnes 
  });

  res.json({
    success: true,
    data: reservation,
    message: 'Réservation annulée avec succès'
  });
}));

// GET /api/reservations/voyage/:voyageId - Réservations d'un voyage
router.get('/voyage/:voyageId', asyncHandler(async (req, res) => {
  const voyageId = parseInt(req.params.voyageId);
  if (isNaN(voyageId)) {
    throw new AppError('ID voyage invalide', 400);
  }

  // Vérifier que le voyage existe
  const voyage = await Voyage.findByPk(voyageId);
  if (!voyage) {
    throw new AppError('Voyage non trouvé', 404);
  }

  const reservations = await Reservation.findAll({
    where: { voyageId },
    include: [{ model: Client, as: 'client', attributes: ['nom', 'prenom','email','telephone'] }],
    order: [['dateReservation', 'DESC']]
  });

  res.json({
    success: true,
    count: reservations.length,
    voyageId,
    data: reservations
  });
}));

module.exports = router;