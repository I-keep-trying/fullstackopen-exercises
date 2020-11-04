import React from 'react';

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return <h2>{courseName} </h2>;
};

export default Header;
