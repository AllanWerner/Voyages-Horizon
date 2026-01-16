'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Destinations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      pays: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      continent: {
        type: Sequelize.ENUM('Europe', 'Asie', 'Amérique', 'Afrique', 'Océanie', 'Antarctique')
      },
      description: {
        type: Sequelize.TEXT
      },
      climat: {
        type: Sequelize.ENUM('Tropical', 'Désertique', 'Tempéré', 'Polaire', 'Montagnard')
      },
      meilleurePeriode: {
        type: Sequelize.STRING(50)
      },
      langues: {
        type: Sequelize.STRING(100)
      },
      monnaie: {
        type: Sequelize.STRING(20)
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Destinations');
  }
};