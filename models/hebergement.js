'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hebergement extends Model {
    static associate(models) {
      // Relation One-to-Many avec Destination
      Hebergement.belongsTo(models.Destination, {
        foreignKey: 'destinationId',
        as: 'destination'
      });
    }
  }

  Hebergement.init({
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Hôtel', 'Auberge', 'Camping', 'Appartement', 'Villa')
    },
    categorie: {
      type: DataTypes.ENUM('Économique', 'Standard', 'Confort', 'Luxe')
    },
    adresse: {
      type: DataTypes.STRING(200)
    },
    nombreEtoiles: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    },
    equipements: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue('equipements');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(value) {
        this.setDataValue('equipements', JSON.stringify(value));
      }
    },
    prixNuit: {
      type: DataTypes.DECIMAL(8, 2),
      validate: {
        min: 1
      }
    },
    destinationId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Hebergement',
    tableName: 'Hebergements'
  });

  return Hebergement;
};