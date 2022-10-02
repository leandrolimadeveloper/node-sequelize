const { Op } = require('sequelize')
const User = require('../models/User')

module.exports = {
    async show(req, res) {
        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%@empresaX.com'
                }
            },
            include: [
                { association: 'addresses', where: { street: 'Rua Baião'} },
                {
                    association: 'techs',
                    where: {
                        name: {
                            [Op.iLike]: {
                                [Op.any]: ['React%', 'Node%', 'Ruby%', 'PHP', 'JS', 'JavaScript', 'Java', 'C#']
                            }
                        }
                    }
                }
            ]
        })

        return res.json(users)
    }
}
