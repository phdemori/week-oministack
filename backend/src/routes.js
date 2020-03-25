
const express = require("express");

const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.get('/', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/listFromOng', incidentController.listFromOng);
routes.get('/incidents', incidentController.index);
routes.post('/incidents/new', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profile', incidentController.listFromOng);

routes.post('/sessions', sessionController.create);

module.exports = routes;
