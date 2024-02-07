import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Error } from '../components/Error';
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

  useEffect(() => {
    // Delay showing the error message for a second
    const timeoutId = setTimeout(() => {
      setError(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {error ? (
        <Error message='Something went wrong during authentication' />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
