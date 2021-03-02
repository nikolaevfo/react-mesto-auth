import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo-white.svg';

function Header(props) {

  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  function handleBtnClick() {
    setIsBurgerOpen(!isBurgerOpen)
  }

  return (
    <header className={isBurgerOpen ? "header header_burger-opened" : "header"}>
      <div className="header__container">
        <img src={logoImg} alt="Лого" className="logo header__logo" />
        <div className="header__btn" onClick={handleBtnClick}>
          <span className={isBurgerOpen ? 'header__burger header__burger_active' : 'header__burger' } />
        </div>
        <div className="header__info">
          <p className="header__info-email">{props.email}</p>
          <Link to={props.headerLinkUrl} className="header__info-link button" onClick={props.onClick}>{props.btnText}</Link>
        </div> 
      </div>
    </header>
  );
}

export default Header;
