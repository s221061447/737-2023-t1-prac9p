import express from 'express';
import { logInfoMessage } from './logger.js';
import { addUser, getUser, getUsers, doesUserExist, deleteUser, updateUser, verifyAdmin, doesAdminExist } from './users.js';
import crypto from 'crypto';

const router = express.Router();

// Define endpoint for user addition
router.post('/addUser', (req, res, next) => {
    let email = req.query.email;
    let apiKey = crypto.randomBytes(20).toString('hex')
    addUser(email, apiKey);
    res.send({ email, apiKey });
    logInfoMessage(`User ${email} added with API key ${apiKey}`);
});

// Get Users
router.get('/getUsers', async (req, res, next) => {
    let users = await getUsers();
    res.send(users);
    logInfoMessage(`Users returned`);
});

// Get User
router.get('/getUser', async (req, res, next) => {
    let email = req.query.email;
    let apiKey = req.query.apiKey;
    let user = await getUser(email, apiKey);
    res.send(user);
    logInfoMessage(`User ${email} returned`);
});

// Does User Exist
router.get('/doesUserExist', async (req, res, next) => {
    let email = req.query.email;
    let userExists = await doesUserExist(email);
    res.send(userExists);
    logInfoMessage(`User ${email} exists: ${userExists}`);
});

// Delete User
router.delete('/deleteUser', async (req, res, next) => {
    let email = req.query.email;
    let userDeleted = await deleteUser(email);
    res.send(userDeleted);
    logInfoMessage(`User ${email} deleted: ${userDeleted}`);
});

// Update user API key
router.put('/updateUser', async (req, res, next) => {
    let email = req.query.email;
    let apiKey = crypto.randomBytes(20).toString('hex');
    let userUpdated = await updateUser(email, apiKey);
    if (userUpdated) {
        res.send({ email, apiKey });
        logInfoMessage(`User ${email} updated with API key ${apiKey}`);
    } else {
        res.send({ email, apiKey: null });
        logInfoMessage(`User ${email} not updated`);
    }
});

// Verify Admin
router.get('/verifyAdmin', async (req, res, next) => {
    let email = req.query.email;
    let apiKey = req.query.apiKey;
    let isAdmin = verifyAdmin(email, apiKey);
    res.send(isAdmin);
    logInfoMessage(`User ${email} is admin: ${isAdmin}`);
});

// Does Admin Exist
router.get('/doesAdminExist', (req, res, next) => {
    let email = req.query.email;
    let adminExists = doesAdminExist(email);
    res.send(adminExists);
    logInfoMessage(`Admin ${email} exists: ${adminExists}`);
});


export default router;