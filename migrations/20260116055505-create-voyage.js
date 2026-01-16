'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Voyages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      dateDepart: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dateRetour: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isAfterDepartDate(value) {
            if (value <= this.dateDepart) {
              throw new Error('La date de retour doit être après la date de départ');
            }
          }
        }
      },
      dureeJours: {
        type: Sequelize.INTEGER,
        validate: {
          min: 1
        }
      },
      prixBase: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0
        }
      },
      placesDisponibles: {
        type: Sequelize.INTEGER,
        defaultValue: 20
      },
      niveauDifficulte: {
        type: Sequelize.ENUM('Facile', 'Modéré', 'Difficile', 'Expert'),
        defaultValue: 'Modéré'
      },
      typeVoyage: {
        type: Sequelize.ENUM('Aventure', 'Culturel', 'Balnéaire', 'Gastronomique', 'Ecotourisme')
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

    // Ajout d'index pour améliorer les performances
    await queryInterface.addIndex('Voyages', ['destinationId']);
    await queryInterface.addIndex('Voyages', ['dateDepart']);
    await queryInterface.addIndex('Voyages', ['typeVoyage']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Voyages');
  }
};