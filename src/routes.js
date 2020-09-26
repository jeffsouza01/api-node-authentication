const express = require('express');
const routes = express.Router();

const AuthController = require('./controller/authController');

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.authenticate);

module.exports = routes;