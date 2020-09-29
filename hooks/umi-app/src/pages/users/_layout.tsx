import React from 'react';

const BasicLayout: React.FC = props => {
  return (
    <div>
      <h1>Yay! Welcome to umi!123</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
