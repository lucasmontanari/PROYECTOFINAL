import logger from '../logger/logger.js'
import UsuarioDTO from '../dtos/UsuarioDTO.js';
import serverResponse from "../utils/serverResponse.js";
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

function getRoot(req, res) { }

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        let user = new UsuarioDTO(req.user);
        let response = new serverResponse(user, "Success")
        res.render("login-ok", response);
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    }
}

function getSignup(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', "register.html"));
}

function postLogin(req, res) {
    let user = req.user;
    res.redirect("/api/productos")
}

function postSignup(req, res) {
    let user = req.user;
    res.redirect("/api/productos")
    //res.sendFile(path.join(__dirname, '..', 'public', "home.html"));
}

function getFaillogin(req, res) {
    logger.error("Error en login")
    res.render("login-error", {});
}

function getFailregister(req, res) {
    logger.error("Error en Registro")
    res.render("register-error", {});
}

function getLogout(req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.sendFile(path.join(__dirname, '..', 'public', "logout.html"));
    });
}

function failRoute(req, res) {
    res.status(404).render("routing-error", {});
}

function home(req, res) {
    if (req.isAuthenticated()) {
        let user = new UsuarioDTO(req.user);
        let response = new serverResponse(user, "Success")
        res.render("home", response);
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    }
}


export {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailregister,
    home
};
