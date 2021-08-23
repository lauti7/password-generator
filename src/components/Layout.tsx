import React from 'react';

interface Props {
  children: JSX.Element
}

const Layout = ({children}: Props) => (
  <div>
    {children}
  </div>
)

export default Layout;