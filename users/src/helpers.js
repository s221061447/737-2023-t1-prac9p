import mongoose from "mongoose";
import Admin from './schema/admin.js';
import User from './schema/user.js';
import 'dotenv/config';
import { logInfoMessage, logger } from "./logger.js";

const connectMongoDB = () => {
    try {
        let connectionUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongodb:27017/Week9`;
        mongoose.connect(connectionUri);
        logger.info("MongoDB Connected");
    } catch (error) {
        logger.error("MongoDB Connection Error: ", err);
        process.exit(1);
    }
}

const bootstrapAdmin = async () => {
    // Bootstrap admin
    let adminCheck = await Admin.findOne({ username: "pauljose@live.com" }).then(existingUser => {
        if (existingUser) {
            return existingUser;
        }
    }).catch(error => {
        logger.error("Error searching for admin:", error);
    });

    if (adminCheck) {
        return;
    }

    const admin = new Admin({
        username: "pauljose@live.com",
        apiKey: "secret"
    });

    admin.save().then(savedUser => {
        logInfoMessage("Bootstrap admin added successfully");
    }).catch(error => {
        logger.error("Error adding admin:", error);
    });
}

const bootstrapUser = async () => {
    // Bootstrap user
    let userCheck = await User.findOne({ username: "alice@live.com" }).then(existingUser => {
        if (existingUser) {
            return existingUser;
        }
    }).catch(error => {
        logger.error("Error searching for user:", error);
    });
    
    if (userCheck) {
        return;
    }

    const user = new User({
        username: "alice@live.com",
        apiKey: "833b33fca986eebfc320b23f10eaa1de04c36879"
    });

    user.save().then(savedUser => {
        logInfoMessage("Bootstrap user added successfully");
    }).catch(error => {
        logger.error("Error adding user:", error);
    });
}

const bootstrap = () => {
    bootstrapAdmin();
    bootstrapUser();
};

export { connectMongoDB, bootstrap };