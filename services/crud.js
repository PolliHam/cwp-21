class CrudService {
    constructor(repository, errors) {
        this.repository = repository;
        this.errors = errors;

        this.defaults = {
            readChunk: {
                limit: 10,
                page: 1,
                sortOrder: 'asc',
                sortField: 'id'
            }
        };
    }

    async readChunk(options) {


        options = Object.assign({}, this.defaults.readChunk,options);


        let limit = parseInt(options.limit);
        let offset = (parseInt(options.page) - 1)*limit;

        return await this.repository.findAll({
            limit: limit,
            offset: offset,
            order: [[
                options.sortField,
                options.sortOrder.toUpperCase()
            ]]
        });
    }

    async read(id) {
        id = parseInt(id);

        if (isNaN(id)) {
            throw this.errors.invalidId;
        }

        const item = await this.repository.findByPk(
            id
        );

        if (!item) {
            throw this.errors.notFound;
        }

        return item;
    }

    async create(data) {
        const item = await this.repository.create(data);

        return item.get({ plain: true });
    }

    async update(data) {
        console.log(data.id);
        await this.repository.update(data, {
            where: {id: data.id},
            limit: 1
        });

        return this.read(data.id);
    }

    async delete(id) {
        const item = await this.repository.findByPk(
            id
        );
        if(this.repository.destroy({
            where:
                { id: id }
        }))
            return item;
    }
}

module.exports = CrudService;