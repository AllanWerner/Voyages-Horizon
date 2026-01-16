'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hebergements', {
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
      type: {
        type: Sequelize.ENUM('Hôtel', 'Auberge', 'Camping', 'Appartement', 'Villa')
      },
      categorie: {
        type: Sequelize.ENUM('Économique', 'Standard', 'Confort', 'Luxe')
      },
      adresse: {
        type: Sequelize.STRING(200)
      },
      nombreEtoiles: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1,
          max: 5
        }
      },
      equipements: {
        type: Sequelize.TEXT
      },
      prixNuit: {
        type: Sequelize.DECIMAL(8, 2),
        validate: {
          min: 1
        }
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

    await queryInterface.addIndex('Hebergements', ['destinationId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Hebergements');
  }
};