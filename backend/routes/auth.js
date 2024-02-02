const express = require("express")
const {getGoogleAccessToken, getGoogleUserInfo} = require("../services/authService")

// const { OAuth2Client } = require("google-auth-library")

const router = express.Router()

router.post('/', async (req, res) => {
    try {
// get the code from frontend
      const code = req.headers.authorization;
      console.log('HEADERS:', req.headers)
      console.log('Authorization Code:', code);

      const accessToken = await getGoogleAccessToken(code)
      console.log('Access Token:', accessToken);

      const userDetails = await getGoogleUserInfo(accessToken)
      console.log('User Details:', userDetails);

      // Process user details and perform necessary actions

      let minutes = 30 * 60 * 1000;
      res.cookie('accessToken', accessToken, {
        maxAge: minutes,
        httpOnly: false
    })
      res = res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
      console.error('Error saving code:', error);
      res.status(500).json({ message: 'Failed to save code' });
    }
});

module.exports = router
