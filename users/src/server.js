import express from 'express';
import { logger } from './logger.js';
import bodyParser from 'body-parser';
import userApi from './userApi.js';

import path from 'path';
import { fileURLToPath } from 'url';

import { connectMongoDB, bootstrap } from './helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
   
// Define Express parameters
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use("/users", userApi);

// Connect MongoDB
connectMongoDB();

// Booststrap MongoDB
bootstrap();

const port = 3030;

// Start Server
app.listen(port, () => {
    logger.log({
        level: 'info',
        message: `App listening on port: ${port}`,
    });
});