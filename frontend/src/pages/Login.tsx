import { useLocation } from 'react-router-dom';
import { LinkButton } from '../components/LinkButton';
import { SignInWithGoogleIcon } from '../utils/SignInWithGoogleIcon';
import { getGoogleUrl } from '../utils/getGoogleUrl';

export const Login = () => {
  const location = useLocation();
  const from = ((location.state as any)?.from?.pathname as string) || '/';
  return (
    <div className='flex w-full h-svh'>
      <div className='bg-gray-700 w-full'>
        <img
          src='/LoginPageGif1.gif'
          className='w-full h-full object-cover blur-md'
        ></img>
      </div>
      <div className='h-full bg-gray-800 flex items-center justify-center w-[500px] z-20'>
        <LinkButton href={getGoogleUrl(from)}>
          <SignInWithGoogleIcon />
        </LinkButton>
      </div>
    </div>
  );
};
