const {DataTypes} = require("sequelize")
// defino el modelo del tipo de dieta
module.exports = (sequelize) => {
    sequelize.define("diet", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING
        }
      })
}