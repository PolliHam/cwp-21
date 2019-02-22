const LRU = require("lru-cache");
const options = {
    max: 5,
    length: function (n, key) { return n * 2 + key.length },
    dispose: function (key, n) { /*n.close() */},
    maxAge: 1000 * 30
};

const otherCache = LRU(50) // sets just the max size

class CacheService{
    constructor() {
        this.cache = LRU(options);
    }


    async set(req, data){
        this.cache.set(req, await JSON.stringify(data));
    }

    async get(req){
        let result =  this.cache.get(req);
        if (result !== undefined && result != null) {
            result = await JSON.parse(result);
        }
        return result;
    }

    async invalidate(req){

    }
}

module.exports = CacheService;