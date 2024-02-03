import express from 'express'
import { getGoogleAuthData, getGoogleUserInfo } from "../services/authService"
import { createPlayer } from '../services/playerService';

// const { OAuth2Client } = require("google-auth-library")

export const authRouter = express.Router()

authRouter.post('/', async (req, res) => {
    try {
      const code = req.headers.authorization;
      console.log('Authorization Code:', code);

      const authData = await getGoogleAuthData(code)
      console.log('Auth Data:', authData);

      const userDetails = await getGoogleUserInfo(authData.access_token)
      console.log('User Details:', userDetails);

      try {
        const newPlayer = await createPlayer(
          {
            email: userDetails.email,
            refreshToken: authData.refresh_token
          }
        )
        console.log("NewPlayer: ", newPlayer)
      } catch (err) {
        console.log(err)
      }

      res.cookie('accessToken', authData.access_token, {
        maxAge: parseInt(authData.expires_in),
        httpOnly: false
    })
      res = res.status(200).json({ ...userDetails, message: 'Authentication successful' });
    } catch (error) {
      console.error('Error saving code:', error);
      res.status(500).json({ message: 'Failed to save code' });
    }
});

authRouter.post