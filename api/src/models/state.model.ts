import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '.';

class State extends Model {
  declare id: CreationOptional<number>;
  declare state: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

State.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    state: {
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
    modelName: 'State',
    tableName: 'state',
    timestamps: false,
    paranoid: false,
    underscored: true,
  },
);

export default State;
