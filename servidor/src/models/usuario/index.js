import { Sequelize, DataTypes, Model } from 'sequelize';

export const db = new Sequelize('crudDB', 'admin', '123456', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db2.sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 1000,
  },
});

class Usuario extends Model {}

Usuario.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: 'Usuario',
  }
);

export { Usuario };
