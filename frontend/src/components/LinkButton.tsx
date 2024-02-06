import React from 'react';
import { withAuth } from '../hoc/AuthHoc';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const LinkButton: React.FC<Props> = ({ ...props }) => {
  return <a {...props} className=''></a>;
};

export const WithAuthlinkButton = withAuth(LinkButton);
