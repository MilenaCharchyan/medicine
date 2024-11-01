const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('med', 'root', 'Pass@123', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
const Medicine = require('./Medicine')(sequelize, Sequelize);
const Company = require('./Company')(sequelize, Sequelize);

Medicine.belongsTo(Company, {
    foreignKey: 'companyId', 
    as: 'company' 
});

Company.hasMany(Medicine, {
    foreignKey: 'companyId', 
    as: 'medicines' 
});

sequelize.sync()

module.exports = { sequelize, Medicine, Company };
