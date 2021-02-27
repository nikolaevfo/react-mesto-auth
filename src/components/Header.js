import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo-white.svg';

function Header(props) {
  return (
    <header className="header">
      <img src={logoImg} alt="Лого" className="logo header__logo" />
      <div className="header__info">
        <p className="header__info-email">{props.email}</p>
        <Link to={props.headerLinkUrl} className="header__info-link button">{props.btnText}</Link>
        {/* <button type='button' className="header__info-button button" onClick={props.onClickHeaderBtn}>{props.btnText}</button> */}
      </div> 
    </header>
  );
}

export default Header;
