module.exports = (userType) => {
    return function (req, res, next) {
        if (req.session.user_id == null) {
            return res.status(401).send("Unauthorized");
        }
        if (req.session.user_role == userType) {
            return next();
        }
    }
}