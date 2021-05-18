const Sequelize = require('sequelize')

const sequelize = new Sequelize('node_complete', 'root', 'Lime5005&', { dialect: 'mysql', host: 'localhost' })

module.exports = sequelize