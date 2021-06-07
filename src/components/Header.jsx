import React from 'react';

export const Header = ({ team, repo }) => {
  return (
    <header>
      <h1 className="header__title">
        ✅ {team}/{repo} 💬
      </h1>
    </header>
  );
};
