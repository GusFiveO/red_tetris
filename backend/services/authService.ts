import axios from 'axios'

export const getGoogleAccessToken = async (code: string | undefined) => {
    const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        null,
        {
            params: {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code'
            }
        }
      );
      const accessToken = response.data.access_token;
      return accessToken
}

export const getGoogleUserInfo = async (accessToken: string | undefined) => {
    const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const userDetails = userResponse.data;
      return userDetails
}