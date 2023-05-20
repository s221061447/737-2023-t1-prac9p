import User from "./schema/user.js";
import { logger } from "./logger.js";

// Add a new user
const addUser = (username, apiKey) => {
    const user = new User({
        username,
        apiKey
    });

    user.save().then(savedUser => {
        logger.info("User added successfully:", savedUser);
    })
    .catch(error => {
        logger.error("Error adding user:", error);
    });
};

// Get a user by username and API key
const getUser = async (username, apiKey) => {
    return await User.findOne({ username, apiKey }).then(existingUser => {
        if (existingUser) {
            return existingUser;
        } else {
            return null;
        }
    }).catch(error => {
        logger.error("Error searching for user:", error);
        return null;
    });
};

// Get all users
const getUsers = async () => {
    return await User.find({}).then(users => {
        return users;
    }).catch(error => {
        logger.error("Error fetching users:", error);
        return null;
    });
};

// Check if a user exists
const doesUserExist = async (username) => {
    return await User.findOne({ username }).then(existingUser => {
        if (existingUser) {
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        logger.error("Error searching for user:", error);
        return false;
    });
};

// Delete a user
const deleteUser = async (username) => {
    return await User.deleteOne({ username }).then(deletedUser => {
        if (deletedUser) {
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        logger.error("Error deleting user:", error);
        return false;
    });
};

// Update a user's API key
const updateUser = async (username, apiKey) => {
    return await User.findOneAndUpdate({ username }, { apiKey }).then(updatedUser => {
        if (updatedUser) {
            return true;
        } else {
            return false;
        }
    }).catch(error => {
        logger.error("Error updating user:", error);
        return false;
    });
};

// Verify that the user is an admin
const verifyAdmin = (username, apiKey) => {
    return username === "pauljose@live.com" && apiKey === "secret";
};

// Check if the admin user exists
const doesAdminExist = (username) => {
    if (username === "pauljose@live.com") {
        return true;
    } else {
        return false;
    }
};

export {
    addUser,
    getUser,
    getUsers,
    doesUserExist,
    deleteUser,
    updateUser,
    verifyAdmin,
    doesAdminExist
};