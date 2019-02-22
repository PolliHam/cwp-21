const CrudService = require('./crud');
const validator = require('../helpers/validation');
const errors = require('../helpers/errors');

class OfficesService extends CrudService{
    async create(data) {
        let flag = validator.validate('offices', data);

        if(flag.error){
            throw errors.validateError;
        }

        return super.create(data);
    }

    async update(date) {
        let flag = validator.validate('offices', data);

        if(flag.error){
            throw errors.validateError;
        }

        return super.update(data);
    }

    async delete(id) {
        const office = await super.read(id);
        if (!office) {
            throw errors.invalidId;
        }
        let properties = await office.getAgents();
        properties.forEach(property => {
            property.update({officeId: null});
        });

        return super.delete(id);
    }

    async getAgents(pid) {
        let id = parseInt(pid);

        if (id) {
            let office =  await super.read(id);
            if (!office) {
                throw errors.invalidId;
            }
            return office.getAgents();
        }

        throw errors.invalidId;
    }
}

module.exports = OfficesService;