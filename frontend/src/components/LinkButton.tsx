import React from 'react';
import '../styles/custom-utilities.css';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const LinkButton: React.FC<Props> = ({ ...props }) => {
  return <a className='btn' {...props}></a>;
};
