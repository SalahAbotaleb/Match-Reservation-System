module.exports = (fun) => {
    return async function (req, res, next) {
        try {
            await fun(req, res);
        } catch (err) {
            next(err);
        }
    }
}