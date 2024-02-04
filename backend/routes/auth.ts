import express from 'express'
import { getGoogleAuthData, getGoogleUserInfo, refreshAccessToken } from "../services/authService"
import { createPlayer } from '../services/playerService';

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
        maxAge: parseInt(authData.expires_in) * 1000,
        httpOnly: false
    })
      const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;

      res.cookie('refreshToken', authData.refresh_token, {
        maxAge: millisecondsInMonth,
        httpOnly: false
    })
      res = res.status(200).json({ ...userDetails, message: 'Authentication successful' });
    } catch (error) {
      console.error('Error saving code:', error);
      res.status(500).json({ message: 'Failed to save code' });
    }
});

authRouter.post('/refresh', async (req, res) => {
    try {
      const refreshToken = req.headers.authorization
      console.log("Refresh Token:", refreshToken)

      const accessTokenInfo = await refreshAccessToken(refreshToken)
      console.log("New Access Token Info:", accessTokenInfo)

      res.cookie('accessToken', accessTokenInfo.access_token, {
        maxAge: parseInt(accessTokenInfo.expires_in),
        httpOnly: false
    })

      res = res.status(200).json({message: 'Authentication successful' });
    } catch(error) {
      console.error('Error refreshing access token:', error);
      res.status(500).json({ message: 'Failed to refresh access token' });
    }
})