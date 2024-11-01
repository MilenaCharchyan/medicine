module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define('company', {
        name: Sequelize.STRING,
        description: Sequelize.STRING
    });

    return Company;
};
