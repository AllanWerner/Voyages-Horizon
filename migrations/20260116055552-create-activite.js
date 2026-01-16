'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activites', {
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
      description: {
        type: Sequelize.TEXT
      },
      dureeHeures: {
        type: Sequelize.DECIMAL(4, 1),
        validate: {
          min: 1
        }
      },
      prix: {
        type: Sequelize.DECIMAL(8, 2),
        validate: {
          min: 1
        }
      },
      type: {
        type: Sequelize.ENUM('Visite', 'Sport', 'Gastronomie', 'Shopping', 'Spectacle')
      },
      niveauPhysique: {
        type: Sequelize.ENUM('Faible', 'Modéré', 'Élevé')
      },
      ageMinimum: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      destinationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Destinations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.addIndex('Activites', ['destinationId']);
    await queryInterface.addIndex('Activites', ['type']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Activites');
  }
};