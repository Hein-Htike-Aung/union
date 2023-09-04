import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelize } from '.';
import Township from './township.model';

class Patient extends Model {
  declare id: CreationOptional<number>;
  declare name: string;
  declare phone: string;
  declare age: number;
  declare address: string;
  declare township_id: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Patient.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    township_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'township',
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
    modelName: 'Patient',
    tableName: 'patient',
    timestamps: false,
    paranoid: false,
    underscored: true,
  },
);

/*  */
Township.hasMany(Patient, {
  foreignKey: 'township_id',
  as: 'patients',
});

Patient.belongsTo(Township, {
  foreignKey: 'township_id',
  as: 'township',
});

export default Patient;
