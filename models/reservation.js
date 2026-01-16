// models/reservation.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      // Associations
      Reservation.belongsTo(models.Client, {
        foreignKey: 'clientId',
        as: 'client'
      });
      Reservation.belongsTo(models.Voyage, {
        foreignKey: 'voyageId',
        as: 'voyage'
      });
    }
  }

  Reservation.init({
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
    voyageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Voyages',
        key: 'id'
      }
    },
    dateReservation: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    nombrePersonnes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    prixTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    statut: {
      type: DataTypes.ENUM('En attente', 'Confirmée', 'Annulée', 'Terminée'),
      defaultValue: 'En attente'
    }
  }, {
    sequelize,
    modelName: 'Reservation',
    tableName: 'Reservations'
  });

  return Reservation;
};