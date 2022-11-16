function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/api/login");
    }
}

export default checkAuth