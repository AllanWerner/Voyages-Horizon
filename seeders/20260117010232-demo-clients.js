'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', [
      {
        nom: "Martin",
        prenom: "Jean",
        email: "jean.martin@email.com",
        telephone: "+33 1 23 45 67 89",
        dateNaissance: "1985-06-15",
        ville: "Paris",
        pays: "France",
        preferences: '{"alimentation": "végétarien","chambre": "vue mer","niveauConfort": "standard"}'
      },
      {
        nom: "Dupont",
        prenom: "Marie",
        email: "marie.dupont@email.com",
        telephone: "0123456789",
        dateNaissance: "1990-11-22",
        ville: "Lyon",
        pays: "France",
        preferences: '{"alimentation": "omnivore","chambre": "sans vue","niveauConfort": "supérieur","animaux": false}'
      },
      {
        nom: "Smith",
        prenom: "John",
        email: "john.smith@email.com",
        telephone: "+44 20 7946 0958",
        dateNaissance: "1978-03-30",
        ville: "London",
        pays: "United Kingdom",
        preferences: '{"chambre": "vue piscine","niveauConfort": "luxe","fumeur": false}'
      },
      {
        nom: "Garcia",
        prenom: "Ana",
        email: "ana.garcia@email.com",
        telephone: "+34 91 123 45 67",
        dateNaissance: "1995-08-10",
        ville: "Madrid",
        pays: "Spain",
        preferences: null // Peut être null
      },
      {
        nom: "Bernard",
        prenom: "Luc",
        email: "luc.bernard@email.com",
        telephone: null, // Peut être null
        dateNaissance: null, // Peut être null
        ville: "Bruxelles",
        pays: "Belgique",
        preferences: '{"chambre": "étage supérieur","accessibilite": true}'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};