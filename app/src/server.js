import express from 'express';
import passport from 'passport';
import calculatorApis from './calculatorApi.js';
import authApis from './authApi.js';
import userApi from './userApi.js';
import('./auth.js');
import { logger } from './logger.js';
import bodyParser from 'body-parser';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
   
// Define Express parameters
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use("/auth", authApis);
app.use("/users", passport.authenticate('jwtAdmin', {session: false}), userApi);
app.use("/calculate", passport.authenticate('jwtUser', {session: false}), calculatorApis);

const port = 3030;

// Start Server
app.listen(port, () => {
    logger.log({
        level: 'info',
        message: `App listening on port: ${port}`,
    });
});