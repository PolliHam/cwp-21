const CrudService = require('./crud');
const validator = require('../helpers/validation');
const errors = require('../helpers/errors');

class PropertiesService extends CrudService {
    async create(data) {
        let validationResult = validator.validate('properties', data);

        if (validationResult.error) {
            throw errors.validateError;
        }

        return super.create(data);

    }

    async update(data) {
        let validationResult = validator.validate('propertiesUpdate', data);

        if (validationResult.error) {
            throw errors.validateError;
        }

        return super.update(data);
    }

    async bindToAgent(pid, pidAgent) {
        let id = parseInt(pid);
        let idAgent = parseInt(pidAgent);

        if (idAgent  && id) {
            return super.update({ id: id, agentId: idAgent  })
        }

        throw errors.invalidId;
    }

    async unbindFromAgent(pid) {
        const id = parseInt(pid);
        if (id) {
            return super.update({id:id,  agentId: null });
        }

        throw errors.invalidId;
    }

}

module.exports = PropertiesService;