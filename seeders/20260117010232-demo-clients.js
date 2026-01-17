'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clients', [
      {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@email.com',
        telephone: '+33123456789',
        dateNaissance: '1985-06-15',
        ville: 'Paris',
        pays: 'France',
        preferences: "theme: 'dark'"
      },
      {
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@email.com',
        telephone: '+33198765432',
        dateNaissance: '1990-03-22',
        ville: 'Lyon',
        pays: 'France',
        preferences: "theme: 'dark'"
      },
      {
        nom: 'Bernard',
        prenom: 'Pierre',
        email: 'pierre.bernard@email.com',
        telephone: '+33155556677',
        dateNaissance: '1978-11-30',
        ville: 'Marseille',
        pays: 'France',
        preferences: "theme: 'dark'"
      },
      {
        nom: 'Petit',
        prenom: 'Marie',
        email: 'marie.petit@email.com',
        telephone: '+33188889900',
        dateNaissance: '1995-08-10',
        ville: 'Toulouse',
        pays: 'France',
        preferences: "theme: 'dark'"
      },
      {
        nom: 'Durand',
        prenom: 'Thomas',
        email: 'thomas.durand@email.com',
        telephone: '+33144445566',
        dateNaissance: '1982-01-25',
        ville: 'Bordeaux',
        pays: 'France',
        preferences: "theme: 'dark'"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};