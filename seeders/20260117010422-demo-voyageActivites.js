'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     * 
     * IMPORTANT: Assurez-vous que les Voyages et Activites existent déjà.
     * Table de jonction pour la relation many-to-many entre Voyages et Activites.
     */
    
    await queryInterface.bulkInsert('VoyageActivites', [
      {
        // Voyage 1 (Bali) - Activité 1 (Temple d'Uluwatu) - Jour 2
        voyageId: 1,
        activiteId: 1,
        jour: 2,
        ordre: 1,
        estInclus: true
      },
      {
        // Voyage 1 (Bali) - Activité 2 (Surf à Kuta) - Jour 3
        voyageId: 1,
        activiteId: 2,
        jour: 3,
        ordre: 1,
        estInclus: false
      },
      {
        // Voyage 2 (Paris) - Activité 3 (Louvre) - Jour 1
        voyageId: 2,
        activiteId: 3,
        jour: 1,
        ordre: 2,
        estInclus: true
      },
      {
        // Voyage 2 (Paris) - Activité 4 (Dîner croisière) - Jour 4
        voyageId: 2,
        activiteId: 4,
        jour: 4,
        ordre: 1,
        estInclus: true
      },
      {
        // Voyage 3 (Maldives) - Activité 5 (Plongée) - Jour 5
        voyageId: 3,
        activiteId: 5,
        jour: 5,
        ordre: 1,
        estInclus: false
      },
      {
        // Voyage 4 (Toscane) - Activité 6 (Dégustation vins) - Jour 3
        voyageId: 4,
        activiteId: 6,
        jour: 3,
        ordre: 1,
        estInclus: true
      },
      {
        // Voyage 5 (Norvège) - Activité 7 (Aurores boréales) - Jour 7
        voyageId: 5,
        activiteId: 7,
        jour: 7,
        ordre: 1,
        estInclus: true
      },
      {
        // Voyage 7 (Japon) - Activité 8 (Cours de sushi) - Jour 2
        voyageId: 7,
        activiteId: 8,
        jour: 2,
        ordre: 2,
        estInclus: false
      },
      {
        // Voyage 9 (Costa Rica) - Activité 9 (Traîneau à chiens) - Jour 4
        // Note: L'activité 9 est normalement pour Québec, mais on l'adapte pour Costa Rica
        voyageId: 9,
        activiteId: 9,
        jour: 4,
        ordre: 1,
        estInclus: false
      }
    ], {});

    console.log('✅ Seeders VoyageActivites insérés avec succès');
    
    // Vérification de cohérence
    console.log('\n📊 Résumé des associations créées:');
    console.log('1. Voyage Bali → Temple Uluwatu (inclus) + Surf Kuta (optionnel)');
    console.log('2. Voyage Paris → Louvre (inclus) + Dîner croisière (inclus)');
    console.log('3. Voyage Maldives → Plongée (optionnel)');
    console.log('4. Voyage Toscane → Dégustation vins (inclus)');
    console.log('5. Voyage Norvège → Aurores boréales (inclus)');
    console.log('6. Voyage Japon → Cours sushi (optionnel)');
    console.log('7. Voyage Costa Rica → Activité adaptée (optionnel)');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('VoyageActivites', null, {});
    
    // Réinitialiser l'auto-increment
    await queryInterface.sequelize.query('ALTER TABLE VoyageActivites AUTO_INCREMENT = 1');
  }
};