import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import District from './district.model';

class Township extends Model {
  declare id: CreationOptional<number>;
  declare township: string;
  declare district_id: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Township.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    township: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'district',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE(6),
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Township',
    tableName: 'township',
    timestamps: false,
    paranoid: false,
    underscored: true,
  },
);

/*  */
District.hasMany(Township, {
  foreignKey: 'district_id',
  as: 'townships',
});

Township.belongsTo(District, {
  foreignKey: 'district_id',
  as: 'district',
});

export default Township;
