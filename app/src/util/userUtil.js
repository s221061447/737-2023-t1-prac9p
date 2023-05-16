import axios from 'axios';

// Get user from users microservice
const getUser = async (email, apiKey) => {
    try {
        const response = await axios.get(`http://users:3030/users/getUser?email=${email}&apiKey=${apiKey}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

// Get users from users microservice
const getUsers = async () => {
    try {
        const response = await axios.get(`http://users:3030/users/getUsers`);
        return response.data;
    } catch (error) {
        return error;
    }
}

// Add user to users microservice
const addUser = async (email) => {
    try {
        const response = await axios.post(`http://users:3030/users/addUser?email=${email}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

// Does user exist in users microservice
const doesUserExist = async (email) => {
    try {
        const response = await axios.get(`http://users:3030/users/doesUserExist?email=${email}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

// Verify admin in users microservice
const verifyAdmin = async (email, apiKey) => {
    try {
        const response = await axios.get(`http://users:3030/users/verifyAdmin?email=${email}&apiKey=${apiKey}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

// Does admin exist in users microservice
const doesAdminExist = async (email) => {
    try {
        const response = await axios.get(`http://users:3030/users/doesAdminExist?email=${email}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export {
    addUser,
    getUser,
    getUsers,
    doesUserExist,
    verifyAdmin,
    doesAdminExist
};