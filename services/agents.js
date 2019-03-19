const CrudService = require('./crud');
const validator = require('../helpers/validation');
const errors = require('../helpers/errors');

class AgentsService extends CrudService{
    async create(data) {
        let flag = validator.validate('agents', data);

        if(flag.error){
            throw errors.validateError;
        }

        return super.create(data);
    }

    async update(data) {
        let flag = validator.validate('agentsUpdate', data);

        if(flag.error){
            throw errors.validateError;
        }

        return super.update(data);
    }

    async delete(id) {
        const agent = await super.read(id);
        if (!agent) {
            throw errors.invalidId;
        }
        let properties = await agent.getProperties();
        properties.forEach(property => {
            property.update({agentId: null});
        });

        return super.delete(id);
    }

    async bindToOffice(pid, pidOffice){
        let id = parseInt(pid);
        let idOffice = parseInt(pidOffice);

        if(id && idOffice) {
            return super.update({ id: id, officeId: idOffice })
        }

        throw errors.invalidId;
    }

    async unbindFromOffice(pid){
        let Id = parseInt(pid);

        if(Id) {
            return super.update({id:Id, officeId: null })
        }

        throw errors.invalidId;
    }

    async getProperties (pid) {
        let id = parseInt(pid);

        if (id) {
            let agent =  await super.read(id);
            if (!agent) {
                throw errors.invalidId;
            }
            return agent.getProperties();
        }

        throw errors.invalidId;
    }

}

module.exports = AgentsService;