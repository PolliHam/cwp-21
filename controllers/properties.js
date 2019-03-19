const CrudController = require('./crud');

class PropertiesController extends CrudController {
    constructor(propertiesService, cacheService) {
        super(propertiesService, cacheService);

        this.unbindFromAgent = this.unbindFromAgent.bind(this);
        this.bindToAgent = this.bindToAgent.bind(this);


        this.routes['/unbindAgent'] = [{method: 'post', cb: this.unbindFromAgent}];
        this.routes['/bindAgent'] = [{method: 'post', cb: this.bindToAgent}];

        this.registerRoutes();
    }

    async unbindFromAgent(req, res){
        const result = await this.service.unbindFromAgent(req.body.id);

        res.json(result);
    }

    async bindToAgent(req, res){
        const result = await this.service.bindToAgent(req.body.id, req.body.idAgent);

        res.json(result);
    }

}

module.exports = (propertiesService, cacheService) => {
    const controller = new PropertiesController(
        propertiesService,
        cacheService
    );

    return controller.router;
};