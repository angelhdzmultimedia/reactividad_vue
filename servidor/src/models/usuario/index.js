import { Sequelize, DataTypes, Model } from 'sequelize';

export const db = new Sequelize('crudDB', 'admin', '123456', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: `db4.sqlite`,
});

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Usuario',
  }
);

export { Usuario };
