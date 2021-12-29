const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING
    }, {
      sequelize,
      tableName: "users"
    });
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
    this.belongsToMany(models.Tech, { foreignKey: "user_id", through: "user_techs", as: "techs" });
  }
}

module.exports = User;
