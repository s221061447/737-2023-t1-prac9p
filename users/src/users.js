import User from "./schema/user.js";
import { logger } from "./logger.js";

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

const getUsers = async () => {
    return await User.find({}).then(users => {
        return users;
    }).catch(error => {
        logger.error("Error fetching users:", error);
        return null;
    });
};

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

const verifyAdmin = (username, apiKey) => {
    return username === "pauljose@live.com" && apiKey === "secret";
};

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
    verifyAdmin,
    doesAdminExist
};