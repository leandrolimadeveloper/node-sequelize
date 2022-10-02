const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const users = await User.findAll()

        return res.json(users)
    },

    async store(req, res) {
        const { name, email } = req.body

        const emailFormatted = email.toLowerCase()

        const user = await User.create({
            name,
            email: emailFormatted
        })

        return res.json(user)
    },

    async update(req, res) {
        const { user_id } = req.params
        const { name, email } = req.body

        const user = await User.findByPk(user_id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        if (email == user.email) {
            return res.status(400).json({ error: 'Email inserted is the same registered' })
        }

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email }
            })

            if (userExists) {
                return res.status(400).json({ error: 'Email already exists in the database' })
            }
        }

        await user.update(req.body)

        return res.json({
            error: false,
            message: 'Data updated successfully',
            name,
            email
        })
    },

    async delete(req, res) {
        const { user_id } = req.params

        const user = await User.findByPk(user_id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        await User.destroy({
            user,
            where: {
                id: user_id
            }
        })

        return res.json()
    }
}
