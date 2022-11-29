const { Model, DataTypes, STRING } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}
User.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: "The username cannot be null"
            },
            isAlphanumeric: {
                args: true,
                msg: "The username may only contain letters"
            },
            len: {
                args: [3, 15],
                msg: "The username must contain between 3 and 100 characters"
            }
        },
    },

    hashedPass: {
        type: STRING,
        allowNull: false,
        validate:{
            notNull: {
                msg:"This field cannot be null"
            }
        }
    },
    
    // 0 for clients, 1 for admin
    role: {
        type: DataTypes.INTEGER,
        validate:{
            min:{
                args:-1,
                msg: "The field must be more than or equal to 0"
            },
            max:{
                args:1,
                msg: "The field must be less than or equal to 1"
            }
        }
    }
}, {
    sequelize,
    modelName: "User"
});

module.exports = User;