const CrudController = require('./crud');

class AgentsController extends CrudController {
    constructor(agentsService, cacheService) {
        super(agentsService, cacheService);

        this.unbindFromOffice = this.unbindFromOffice.bind(this);
        this.bindToOffice = this.bindToOffice.bind(this);
        this.getProperties = this.getProperties.bind(this);


        this.routes['/unbindOffice'] = [{method: 'post', cb: this.unbindFromOffice}];
        this.routes['/bindOffice'] = [{method: 'post', cb: this.bindToOffice}];
        this.routes['/properties/:id'] = [{method: 'get', cb: this.getProperties}];///////????????

        this.registerRoutes();
    }

    async unbindFromOffice(req, res){
        const result = await this.service.unbindFromOffice(req.body.id);

        res.json(result);
    }

    async bindToOffice(req, res){
        const result = await this.service.bindToOffice(req.body.id, req.body.idOffice);

        res.json(result);
    }

    async getProperties(req, res){
        const properties = await this.service.getProperties(req.params.id);
        this.cache.set(req, properties);
        res.json(properties);
    }
}

module.exports = (agentsService, cacheService) => {
    const controller = new AgentsController(
        agentsService,
        cacheService
    );

    return controller.router;
};