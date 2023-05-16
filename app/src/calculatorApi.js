import express from 'express';
import { logOperation, logSuccess, logInvalidInput } from './logger.js';

const router = express.Router();

// Define endpoint for addition
router.get('/addtwonumbers', (req, res, next) => {
    logOperation("addition", req.query.n1, req.query.n2);
    if (validateInput(req.query.n1, req.query.n2) === false) {
        res.status(400).send("Invalid input");
        logInvalidInput(req.query.n1, req.query.n2);
        return;
    }
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let sum = addTwoNumbers(n1, n2);
    res.send(sum.toString());
    logSuccess("addition", n1, n2);
});

// Define endpoint for subtraction
router.get('/subtracttwonumbers', (req, res, next) => {
    logOperation('subtraction', req.query.n1, req.query.n2);
    if (validateInput(req.query.n1, req.query.n2) === false) {
        res.status(400).send("Invalid input");
        logInvalidInput(req.query.n1, req.query.n2);
        return;
    }
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let sum = subtractTwoNumbers(n1, n2);
    res.send(sum.toString());
    logSuccess("subtraction", n1, n2);
});

// Define endpoint for multiplication
router.get('/multiplytwonumbers', (req, res, next) => {
    logOperation("multiplication", req.query.n1, req.query.n2);
    if (validateInput(req.query.n1, req.query.n2) === false) {
        res.status(400).send("Invalid input");
        logInvalidInput(req.query.n1, req.query.n2);
        return;
    }
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let sum = multiplyTwoNumbers(n1, n2);
    res.send(sum.toString());
    logSuccess("multiplication", n1, n2);
});

// Define endpoint for division
router.get('/dividetwonumbers', (req, res, next) => {
    logOperation("division", req.query.n1, req.query.n2);
    if (validateInput(req.query.n1, req.query.n2) === false) {
        res.status(400).send("Invalid input");
        logInvalidInput(req.query.n1, req.query.n2);
        return;
    }
    let n1 = parseInt(req.query.n1);
    let n2 = parseInt(req.query.n2);
    let sum = divideTwoNumbers(n1, n2);
    res.send(sum.toString());
    logSuccess("division", n1, n2);
});

// Define method for addition
const addTwoNumbers = (n1, n2) => {
    return n1 + n2;
};

// Define method for subtraction
const subtractTwoNumbers = (n1, n2) => {
    return n1 - n2;
};

// Define method for multiplication
const multiplyTwoNumbers = (n1, n2) => {
    return n1 * n2;
};

// Define method for division
const divideTwoNumbers = (n1, n2) => {
    return n1 / n2;
};

// Define helper methods
const validateInput = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return false;
    }
    return true;
};

export default router;