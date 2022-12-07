const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Client extends Model {}
Client.init(
  {
    DNI:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate:{
            notNull:{
                msg: "El campo no puede ser nulo"
            },
            isInt:{
                args:true,
                msg: "El campo debe ser numerico"
            },
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El campo no puede ser nulo"
            },
            len: {
                args: [3, 100],
                msg: "El nombre tiene que ser entre 3 y 100 caracteres"
            }
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [3, 100],
                msg: "Description must be between 3 and 100 characters"
            }
        },
    },
    phone:{
        type: DataTypes.STRING,
        allowNull:true,
        validate: {
            len: {
                args: [5, 20],
                msg: "Phone must be between 5 and 20 characters"
            }
        },
    },
    lastAttendance:{
        type: DataTypes.DATE
    },
    lastPayment:{
        type: DataTypes.DATE
    }
  },
  {
    sequelize,
    timestamps:false,
    modelName: "Client"
  }
);
module.exports = Client;
