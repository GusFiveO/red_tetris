import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const validateAccessTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  console.log('ACCESS TOKEN IN MIDDLEWARE:', accessToken);

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const tokenInfo = response.data;

    if (tokenInfo.audience !== process.env.GOOGLE_CLIENT_ID) {
      throw new Error('Invalid access token audience');
    }

    req.body.user = tokenInfo;

    // You can perform additional checks or actions with the payload if needed

    next();
  } catch (err) {
    console.log('ERROR IN MIDDLEWARE:', err);
    return res.status(401).json({ error: 'Invalid access token' });
  }
};
