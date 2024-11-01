module.exports = (sequelize, Sequelize) => {
    const Medicine = sequelize.define('medicine', {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.INTEGER,
        count: Sequelize.INTEGER,
        companyId: Sequelize.INTEGER,
        date: Sequelize.DATE
    });
    return Medicine;
};
