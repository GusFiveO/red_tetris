import React from 'react';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const LinkButton: React.FC<Props> = ({ ...props }) => {
  return <a {...props} className=''></a>;
};
