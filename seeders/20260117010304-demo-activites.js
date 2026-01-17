'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     * 
     * Note: Assurez-vous que les Destinations existent déjà.
     * Les destinationId doivent correspondre aux IDs dans votre table Destinations.
     * Nous utilisons les IDs des destinations du seeder précédent.
     */
    
    await queryInterface.bulkInsert('Activites', [
      {
        // Activité 1 - Bali
        nom: 'Visite du Temple d\'Uluwatu',
        description: 'Découverte du temple hindou perché sur une falaise avec spectacle de danse Kecak au coucher du soleil',
        dureeHeures: 3.5,
        prix: 45.00,
        type: 'Visite',
        niveauPhysique: 'Modéré',
        ageMinimum: 8,
        destinationId: 1 
      },
      {
        // Activité 2 - Bali
        nom: 'Cours de Surf à Kuta Beach',
        description: 'Initiation au surf avec moniteur certifié. Matériel inclus : planche, combinaison, leçons',
        dureeHeures: 2.0,
        prix: 65.50,
        type: 'Sport',
        niveauPhysique: 'Modéré',
        ageMinimum: 12,
        destinationId: 1 
      },
      {
        // Activité 3 - Paris
        nom: 'Visite Guidée du Louvre',
        description: 'Tour privé des chefs-d\'œuvre du musée : Joconde, Vénus de Milo, Victoire de Samothrace',
        dureeHeures: 4.0,
        prix: 85.00,
        type: 'Visite',
        niveauPhysique: 'Faible',
        ageMinimum: 6,
        destinationId: 2 
      },
      {
        // Activité 4 - Paris
        nom: 'Dîner Croisière sur la Seine',
        description: 'Dîner gastronomique avec vue panoramique sur les monuments parisiens illuminés',
        dureeHeures: 2.5,
        prix: 120.00,
        type: 'Gastronomie',
        niveauPhysique: 'Faible',
        ageMinimum: 0,
        destinationId: 2 
      },
      {
        // Activité 5 - Maldives
        nom: 'Plongée avec Raies Manta',
        description: 'Exploration des sites de plongée peuplés de raies manta et tortues marines',
        dureeHeures: 4.0,
        prix: 150.00,
        type: 'Sport',
        niveauPhysique: 'Élevé',
        ageMinimum: 16,
        destinationId: 3 
      },
      {
        // Activité 6 - Toscane
        nom: 'Dégustation de Vins à Chianti',
        description: 'Visite de vignoble avec dégustation de 5 vins typiques accompagnés de fromages locaux',
        dureeHeures: 3.0,
        prix: 75.00,
        type: 'Gastronomie',
        niveauPhysique: 'Faible',
        ageMinimum: 18,
        destinationId: 4 
      },
      {
        // Activité 7 - Norvège
        nom: 'Safari aux Aurores Boréales',
        description: 'Excursion nocturne en minibus pour observer les aurores boréales avec guide expert',
        dureeHeures: 5.0,
        prix: 110.00,
        type: 'Spectacle',
        niveauPhysique: 'Faible',
        ageMinimum: 8,
        destinationId: 5 
      },
      {
        // Activité 8 - Tokyo
        nom: 'Cours de Sushi Traditionnel',
        description: 'Atelier de préparation de sushi avec chef japonais. Dégustation des créations incluses',
        dureeHeures: 2.5,
        prix: 95.00,
        type: 'Gastronomie',
        niveauPhysique: 'Faible',
        ageMinimum: 10,
        destinationId: 7 
      },
      {
        // Activité 9 - Québec
        nom: 'Traîneau à Chiens en Forêt',
        description: 'Balade en traîneau tiré par des huskies dans la forêt enneigée avec guide musher',
        dureeHeures: 2.0,
        prix: 85.00,
        type: 'Sport',
        niveauPhysique: 'Modéré',
        ageMinimum: 6,
        destinationId: 13 
      }
    ], {});

    console.log('✅ Seeders Activites insérés avec succès');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Activites', null, {});
    
    // Réinitialiser l'auto-increment
    await queryInterface.sequelize.query('ALTER TABLE Activites AUTO_INCREMENT = 1');
  }
};