import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAccessToken } from '../utils/getAccessToken';

export const Redirect = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      getAccessToken(`${import.meta.env.VITE_API_URL}/auth`, code)
        .then(() => {
          window.history.replaceState(null, '', window.location.pathname);
          navigate('/');
        })
        .catch(() => {
          setError(true);
        });
    } else {
      setError(true);
    }
  }, [navigate, searchParams]);

  return <>{error ? <h1>ERROR</h1> : <h1>Loading...</h1>}</>;
};
