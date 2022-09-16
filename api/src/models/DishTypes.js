const {DataTypes} = require("sequelize")
// defino el modelo del tipo de dieta
module.exports = (sequelize) => {
    sequelize.define("dishTypes", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      })
}