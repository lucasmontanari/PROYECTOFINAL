import serverResponse from "../utils/serverResponse.js";
import logger from '../logger/logger.js'

function checkPassword(req, res, next) {
    if (req.body.password==req.body.password2) {
        next();
    } else {
        logger.error("Las contraseñas no coinciden")
        const response = new serverResponse(null, "Las contraseñas no coinciden", true, 500)
        res.render("register-error", response);
    }
}

export default checkPassword