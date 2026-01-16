'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Voyage extends Model {
    static associate(models) {
      // Relation One-to-Many avec Destination
      Voyage.belongsTo(models.Destination, {
        foreignKey: 'destinationId',
        as: 'destination'
      });

      // Relation Many-to-Many avec Client via Reservation
      Voyage.belongsToMany(models.Client, {
        through: models.Reservation,
        foreignKey: 'voyageId',
        otherKey: 'clientId',
        as: 'clients'
      });
      
      // Relation Many-to-Many avec Activite via VoyageActivite
      Voyage.belongsToMany(models.Activite, {
        through: models.VoyageActivite,
        foreignKey: 'voyageId',
        otherKey: 'activiteId',
        as: 'activites'
      });
    }
  }

  Voyage.init({
    titre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    dateDepart: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateRetour: {
      type: DataTypes.DATE,
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
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    },
    prixBase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 1
      }
    },
    placesDisponibles: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
      validate: {
        min: 1
      }
    },
    niveauDifficulte: {
      type: DataTypes.ENUM('Facile', 'Modéré', 'Difficile', 'Expert'),
      defaultValue: 'Modéré'
    },
    typeVoyage: {
      type: DataTypes.ENUM('Aventure', 'Culturel', 'Balnéaire', 'Gastronomique', 'Ecotourisme')
    },
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Voyage',
    tableName: 'Voyages'
  });

  return Voyage;
};