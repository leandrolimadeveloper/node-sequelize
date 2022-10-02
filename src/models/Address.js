const { Model, DataTypes } = require('sequelize')

class Address extends Model {
    static init(sequelize) { // ou connection
        super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER
        }, {
            sequelize // sequelize: connection
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = Address
