import axios from 'axios';

export const getGoogleAuthData = async (code: string | undefined) => {
  const response = await axios.post(
    'https://oauth2.googleapis.com/token',
    null,
    {
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      },
    }
  );
  const authData = response.data;
  return authData;
};

export const getGoogleUserInfo = async (accessToken: string | undefined) => {
  const userResponse = await axios.get(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const userDetails = userResponse.data;
  return userDetails;
};

export const refreshAccessToken = async (refreshToken: string | undefined) => {
  const response = await axios.post(
    'https://oauth2.googleapis.com/token',
    null,
    {
      params: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
    }
  );
  console.log(response.data);
  return response.data;
};
