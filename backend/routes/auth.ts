// const express = require("express")
import express from 'express'
// const {getGoogleAccessToken, getGoogleUserInfo} = require("../services/authService")
import  {getGoogleAccessToken, getGoogleUserInfo} from "../services/authService"

// const { OAuth2Client } = require("google-auth-library")

export const authRouter = express.Router()

authRouter.post('/', async (req, res) => {
    try {
      const code = req.headers.authorization;
      console.log('HEADERS:', req.headers)
      console.log('Authorization Code:', code);

      const accessToken = await getGoogleAccessToken(code)
      console.log('Access Token:', accessToken);

      const userDetails = await getGoogleUserInfo(accessToken)
      console.log('User Details:', userDetails);

      let minutes = 30 * 60 * 1000;
      res.cookie('accessToken', accessToken, {
        maxAge: minutes,
        httpOnly: false
    })
      res = res.status(200).json({ ...userDetails, message: 'Authentication successful' });
    } catch (error) {
      console.error('Error saving code:', error);
      res.status(500).json({ message: 'Failed to save code' });
    }
});

// module.exports = router
