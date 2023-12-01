module.exports = (userType) => {
    return function (req, res, next) {
        if (req.session.user_id == null) {
            return res.status(401).send("Unauthorized");
        }
        if (req.session.status == "pending") {
            return res.status(200).send("Your account is still pending");
        }
        if (req.session.status == "rejected") {
            return res.status(200).send("Your account request is rejected");
        }
        if (req.session.user_role == userType) {
            return next();
        }
    }
}