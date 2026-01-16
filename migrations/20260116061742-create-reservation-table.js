'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      dateReservation: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      nombrePersonnes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      prixTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      statut: {
        type: Sequelize.ENUM('Confirmée', 'En attente', 'Annulée'),
        defaultValue: 'En attente'
      }
    });

    await queryInterface.addIndex('Reservations', ['clientId']);
    await queryInterface.addIndex('Reservations', ['voyageId']);
    await queryInterface.addIndex('Reservations', ['statut']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservations');
  }
};
