import { Sequelize, DataTypes, Model } from 'sequelize';

export const db = new Sequelize('crudDB', 'admin', '123456', {
  dialect: 'sqlite',
  storage: 'db3.sqlite',
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
