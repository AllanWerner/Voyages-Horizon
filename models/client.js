'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      // Relation Many-to-Many avec Voyage via Reservation 
      Client.belongsToMany(models.Voyage, {
        through: models.Reservation,
        foreignKey: 'clientId',
        otherKey: 'voyageId',
        as: 'voyages'
      });
      
      //Accès direct à  Réservation
      Client.hasMany(models.Reservation, {
        foreignKey: 'clientId',
        as: 'reservations'
      });
    }
  }

  Client.init({
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    telephone: {
      type: DataTypes.STRING(20),
      validate: {
        is: /^[0-9+\s()-]*$/i
      }
    },
    dateNaissance: {
      type: DataTypes.DATEONLY
    },
    ville: {
      type: DataTypes.STRING(50)
    },
    pays: {
      type: DataTypes.STRING(50)
    },
    preferences: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue('preferences');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(value) {
        this.setDataValue('preferences', JSON.stringify(value));
      }
    },createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        default: Date.now
    }
  }, {
    sequelize,
    modelName: 'Client',
    tableName: 'Clients'
  });

  return Client;
};