const CrudController = require('./crud');

class OfficeController extends CrudController {
    constructor(officeService, cacheService) {
        super(officeService, cacheService);

        this.getAgents = this.getAgents.bind(this);

        this.routes['/agents/:id'] = [{method: 'get', cb: this.getAgents}];///////????????

        this.registerRoutes();
    }

    async getAgents(req, res){
        const agents = await this.service.getAgents(req.params.id);
        this.cache.set(req, agents);
        res.json(agents);
    }
}

module.exports = (officeService, cacheService) => {
    const controller = new OfficeController(
        officeService,
        cacheService
    );

    return controller.router;
};