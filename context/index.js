module.exports = (Sequelize, config) =>{
    const options = {
        host: config.db.host,
        dialect: config.dialect,
        logging: false,
        define: {
            timestamp: true,
            paranoid: true,
            defaultScope: {
                where:{ deletedAt: {$eq:null}}
            }
        }
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options)
    sequelize.authenticate()
        .then(function() {
            console.log('Connected');
        })
        .catch(function (err) {
            console.log('Error:', err);
        });
    const Agents = require('../models/agents')(Sequelize, sequelize);
    const Offices = require('../models/offices')(Sequelize, sequelize);
    const Properties = require('../models/properties')(Sequelize, sequelize);

    Properties.belongsTo(Agents, {
        as: 'agent',
        foreignKey: 'agentId'
    });
    Agents.hasMany(Properties, {foreignKey: 'agentId'});


    Agents.belongsTo(Offices, {
        as: 'office',
        foreignKey: 'officeId'
    });
    Offices.hasMany(Agents, {foreignKey: 'officeId'});


    return {
        agents: Agents,
        offices: Offices,
        properties: Properties,
        sequelize,
        Sequelize
    };
};