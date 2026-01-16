'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VoyageActivites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      voyageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Voyages',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      activiteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Activites',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      ordre: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      estInclus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });

    await queryInterface.addIndex('VoyageActivites', ['voyageId']);
    await queryInterface.addIndex('VoyageActivites', ['activiteId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VoyageActivites');
  }
};
