import axios from 'axios';

export const getAccessToken = async (api_url: string, code: string | null) => {
  const option = {
    withCredentials: true,
    headers: {
      Authorization: code,
    },
  };
  const response = await axios.post(api_url, {}, option);
  return response;
};
