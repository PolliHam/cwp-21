module.exports = (error, req, res, next) => {
    // TODO: log error + 'res.locals.trace'

    res.error(error);
};
