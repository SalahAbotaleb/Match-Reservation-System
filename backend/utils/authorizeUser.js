module.exports = (userType) => {
    return function (req, res, next) {
        console.log(req.session.user_id );
        if (req.session.user_id == null) {
            return res.status(401).send("Unauthorized");
        }
        if (req.session.status == "pending") {
            return res.status(200).send("Your account is still pending");
        }
        if (req.session.status == "rejected") {
            return res.status(200).send("Your account request is rejected");
        }
        for (let i = 0; i < userType.length; i++)
            if (req.session.user_role == userType[i]) {
                return next();
            }
        return res.status(401).send("Unauthorized");
    }
}