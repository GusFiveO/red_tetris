import { ReactNode } from 'react';
import api from '../api/api';
import { Button } from './Button';

type Props = {
  children: string | ReactNode;
};

const getMyInfo = async () => {
  const response = await api.get('/player/me');
  console.log(response);
};

export const PlayerInfoButton = ({ children }: Props) => {
  return (
    <>
      <Button onClick={getMyInfo}>{children}</Button>
    </>
  );
};
