import { useLocation } from 'react-router-dom';
import { SignInWithGoogleIcon } from '../../public/SignInWithGoogleIcon';
import { LinkButton } from '../components/LinkButton';
import { getGoogleUrl } from '../utils/getGoogleUrl';

export const Login = () => {
  const location = useLocation();
  const from = ((location.state as any)?.from?.pathname as string) || '/';
  return (
    <div className='flex w-full h-svh'>
      <div className='bg-gray-700 w-full'>
        <video
          id='background-video'
          loop
          autoPlay
          disablePictureInPicture
          className='w-full h-full object-cover blur-md'
        >
          <source src='/public/LoginPageVideo.mp4' type='video/mp4' />
        </video>
      </div>
      <div className='h-full bg-gray-800 flex items-center justify-center w-[500px] z-20'>
        <LinkButton href={getGoogleUrl(from)}>
          <SignInWithGoogleIcon />
        </LinkButton>
      </div>
    </div>
  );
};
