const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VoyageActivite extends Model {
    static associate(models) {
      // Association avec Voyage
      VoyageActivite.belongsTo(models.Voyage, {
        foreignKey: 'voyageId',
        as: 'voyage',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      
      // Association avec Activite
      VoyageActivite.belongsTo(models.Activite, {
        foreignKey: 'activiteId',
        as: 'activite',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  VoyageActivite.init({
    voyageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Voyages',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    activiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Activites',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    jour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ordre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estInclus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'VoyageActivite',
    tableName: 'VoyageActivites',
    timestamps: false, // Pas de createdAt/updatedAt selon la migration
    
  });

  return VoyageActivite;
};