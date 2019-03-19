module.exports = (loggingService)=> {
        return (req, res, next) => {
            loggingService.log(req)
            next();
        };
};