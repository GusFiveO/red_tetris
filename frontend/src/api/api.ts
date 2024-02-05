import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status == 401) {
      return axios
        .post(
          import.meta.env.VITE_API_URL + '/auth/refresh',
          {},
          { withCredentials: true }
        )
        .then(async () => {
          const response = await axios({
            ...error.config,
            withCredentials: true,
          });
          return response;
        });
    }
  }
);

export default api;
