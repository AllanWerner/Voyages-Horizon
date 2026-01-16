'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activite extends Model {
    static associate(models) {
      // Relation One-to-Many avec Destination
      Activite.belongsTo(models.Destination, {
        foreignKey: 'destinationId',
        as: 'destination'
      });

      // Relation Many-to-Many avec Voyage via VoyageActivite
      Activite.belongsToMany(models.Voyage, {
        through: models.VoyageActivite,
        foreignKey: 'activiteId',
        otherKey: 'voyageId',
        as: 'voyages'
      });
    }
  }

  Activite.init({
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    dureeHeures: {
      type: DataTypes.DECIMAL(4, 1),
      validate: {
        min: 1
      }
    },
    prix: {
      type: DataTypes.DECIMAL(8, 2),
      validate: {
        min: 1
      }
    },
    type: {
      type: DataTypes.ENUM('Visite', 'Sport', 'Gastronomie', 'Shopping', 'Spectacle')
    },
    niveauPhysique: {
      type: DataTypes.ENUM('Faible', 'Modéré', 'Élevé')
    },
    ageMinimum: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Activite',
    tableName: 'Activites'
  });

  return Activite;
};