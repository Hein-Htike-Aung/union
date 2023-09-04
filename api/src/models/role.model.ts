import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '.';

class Role extends Model {
  declare id: CreationOptional<number>;
  declare role_name: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Role.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    role_name: {
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
    modelName: 'Role',
    tableName: 'role',
    timestamps: false,
    paranoid: false,
    underscored: true,
  },
);

export default Role;
