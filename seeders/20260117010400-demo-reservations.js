'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     * 
     * IMPORTANT: Assurez-vous que les Clients et Voyages existent déjà.
     * Les clientId et voyageId doivent correspondre aux IDs dans vos tables.
     */
    
    await queryInterface.bulkInsert('Reservations', [
      {
        // Réservation 1 - Client Bali pour Voyage Bali
        clientId: 1, // Jean Dupont
        voyageId: 1, // Aventure à Bali
        dateReservation: new Date('2024-01-15'),
        nombrePersonnes: 2,
        prixTotal: 2501.00, // 1250.50 × 2
        statut: 'Confirmée'
      },
      {
        // Réservation 2 - Client Paris pour Voyage Paris
        clientId: 2, // Sophie Martin
        voyageId: 2, // Culture et Art à Paris
        dateReservation: new Date('2024-02-10'),
        nombrePersonnes: 1,
        prixTotal: 890.00,
        statut: 'Confirmée'
      },
      {
        // Réservation 3 - Client Bordeaux pour Voyage Maldives (famille)
        clientId: 3, // Pierre Bernard
        voyageId: 3, // Séjour aux Maldives
        dateReservation: new Date('2024-01-20'),
        nombrePersonnes: 4,
        prixTotal: 8823.00, // 2200.75 × 4
        statut: 'En attente'
      },
      {
        // Réservation 4 - Client Toulouse pour Voyage Toscane (couple)
        clientId: 4, // Marie Petit
        voyageId: 4, // Gastronomie en Toscane
        dateReservation: new Date('2024-02-05'),
        nombrePersonnes: 2,
        prixTotal: 2900.00, // 1450.00 × 2
        statut: 'Confirmée'
      },
      {
        // Réservation 5 - Client Québec pour Voyage Norvège (solo)
        clientId: 5, // Thomas Durand
        voyageId: 5, // Ecotourisme Norvège
        dateReservation: new Date('2024-01-25'),
        nombrePersonnes: 1,
        prixTotal: 1850.25,
        statut: 'Annulée'
      },
      {
        // Réservation 6 - Client Japon pour Voyage Népal (amis)
        clientId: 1, // Jean Dupont (nouvelle réservation)
        voyageId: 6, // Trek Népal
        dateReservation: new Date('2024-03-01'),
        nombrePersonnes: 3,
        prixTotal: 9300.00, // 3100.00 × 3
        statut: 'Confirmée'
      },
      {
        // Réservation 7 - Client Paris pour Voyage Japon
        clientId: 2, // Sophie Martin
        voyageId: 7, // Culture Japon
        dateReservation: new Date('2024-02-15'),
        nombrePersonnes: 2,
        prixTotal: 5301.00, // 2650.50 × 2
        statut: 'En attente'
      },
      {
        // Réservation 8 - Client Maroc pour Voyage Costa Rica
        clientId: 3, // Pierre Bernard
        voyageId: 9, // Aventure Costa Rica
        dateReservation: new Date('2024-03-10'),
        nombrePersonnes: 1,
        prixTotal: 1750.00,
        statut: 'Confirmée'
      },
      {
        // Réservation 9 - Client Bali pour Voyage Grèce
        clientId: 4, // Marie Petit
        voyageId: 10, // Croisière Grèce
        dateReservation: new Date('2024-01-30'),
        nombrePersonnes: 2,
        prixTotal: 3101.50, // 1550.75 × 2
        statut: 'Confirmée'
      }
    ], {});

    console.log('✅ Seeders Reservations insérés avec succès');
    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    // supprimer les réservations
    await queryInterface.bulkDelete('Reservations', null, {});
    
    // Réinitialiser l'auto-increment
    await queryInterface.sequelize.query('ALTER TABLE Reservations AUTO_INCREMENT = 1');
  }
};