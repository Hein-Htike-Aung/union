import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import Role from './role.model';
import Township from './township.model';

class User extends Model {
  declare id: CreationOptional<number>;

  declare username: string;
  declare password: string;
  declare email: string;
  declare role_id: number;
  declare township_id: number;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email',
      validate: {
        isEmail: true,
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id',
      },
    },
    township_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'township',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE(6),
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false,
    paranoid: false,
    underscored: true,
  },
);

/*  */
Role.hasMany(User, {
  foreignKey: 'role_id',
  as: 'users',
});

User.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role',
});

/*  */
Township.hasMany(User, {
  foreignKey: 'township_id',
  as: 'users',
});

User.belongsTo(Township, {
  foreignKey: 'township_id',
  as: 'township',
});

export default User;
