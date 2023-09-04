import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import State from './state.model';

class District extends Model {
  declare id: CreationOptional<number>;
  declare district: string;
  declare state_id: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

District.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    state_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'state',
        key: 'id',
      },
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'District',
    tableName: 'district',
    timestamps: false,
    paranoid: false,
    underscored: true,
  },
);

State.hasMany(District, {
  foreignKey: 'state_id',
  as: 'districts',
});

District.belongsTo(State, {
  foreignKey: 'state_id',
  as: 'state',
});

export default District;
