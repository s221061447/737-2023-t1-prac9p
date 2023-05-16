import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { logInfoMessage, logErrorMessage } from './logger.js';

const router = express.Router();

router.post(
  '/userLogin',
  async (req, res, next) => {
    passport.authenticate(
      'localUser',
      async (err, user, info) => {
        if (err) {
          logErrorMessage(err);
          return res.status(500).send("Internal Server Error");
        } else if (!user) {
          logErrorMessage(info.message);
          return res.status(401).send(info);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { role: 'user' };
            const token = jwt.sign(body, 'TOP_SECRET_KEY', { subject: user.email, issuer: 'http://localhost:3030' });

            logInfoMessage(`User ${user.email} logged in`);

            return res.json({ token });
          }
        );
      }
    )(req, res, next);
  }
);

router.post(
  '/adminLogin',
  async (req, res, next) => {
    passport.authenticate(
      'localAdmin',
      async (err, user, info) => {
        if (err) {
          logErrorMessage(err);
          return res.status(500).send("Internal Server Error");
        } else if (!user) {
          logErrorMessage(info.message);
          return res.status(401).send(info);
        }

        req.login(
          user,
          { session: false },
          async (error) => {
            if (error) return next(error);

            const body = { role: 'admin' };
            const token = jwt.sign(body, 'TOP_SECRET_KEY', { subject: user.email, issuer: 'http://localhost:3030' });

            logInfoMessage(`Admin ${user.email} logged in`);

            return res.json({ token });
          }
        );
      }
    )(req, res, next);
  }
);

export default router;