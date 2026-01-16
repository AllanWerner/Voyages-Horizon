'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {
      // Relation One-to-Many avec Voyage
      Destination.hasMany(models.Voyage, {
        foreignKey: 'destinationId',
        as: 'voyages',
        onDelete: 'CASCADE'
      });

      // Relation One-to-Many avec Hebergement
      Destination.hasMany(models.Hebergement, {
        foreignKey: 'destinationId',
        as: 'hebergements',
        onDelete: 'CASCADE'
      });

      // Relation One-to-Many avec Activite
      Destination.hasMany(models.Activite, {
        foreignKey: 'destinationId',
        as: 'activites',
        onDelete: 'CASCADE'
      });
    }
  }

  Destination.init({
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    pays: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    continent: {
      type: DataTypes.ENUM('Europe', 'Asie', 'Amérique', 'Afrique', 'Océanie', 'Antarctique')
    },
    description: {
      type: DataTypes.TEXT
    },
    climat: {
      type: DataTypes.ENUM('Tropical', 'Désertique', 'Tempéré', 'Polaire', 'Montagnard')
    },
    meilleurePeriode: {
      type: DataTypes.STRING(50)
    },
    langues: {
      type: DataTypes.STRING(100)
    },
    monnaie: {
      type: DataTypes.STRING(20)
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Destination',
    tableName: 'Destinations'
  });

  return Destination;
};