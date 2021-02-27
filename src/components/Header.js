
import logoImg from '../images/logo-white.svg';

function Header() {
  return (
    <header className="header">
      <img src={logoImg} alt="Лого" className="logo header__logo" />
    </header>
  );
}

export default Header;
