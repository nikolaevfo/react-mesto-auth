import React from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {
  
  React.useEffect(() => {
    props.onInit('Войти', '/signin')
  }, [props]);

  const [errorTextEmailInput, setErrorTextEmailInput] = React.useState('');
  const [errorTextPasswordInput, setErrorTextPasswordInput] = React.useState('');

  const placeEmailRef = React.useRef();
  const placePasswordRef = React.useRef();

  function handleEmailChange() {
    setErrorTextEmailInput(placeEmailRef.current.validationMessage)
  } 

  function handlePasswordChange() {
    setErrorTextPasswordInput(placePasswordRef.current.validationMessage)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!placeEmailRef.current.value || !placePasswordRef.current.value) {
      return;
    }
    props.onRegister({ email: placeEmailRef.current.value, password: placePasswordRef.current.value })
  }

  return (
    <div className="regist form-page">
      <div className="form-page__container">
        <h3 className="regist__title form-page__title">Регистрация</h3>
        <form action="#" name="registForm" className="regist__form form-page__form" onSubmit={handleSubmit}>
          <input type="email" name="registInputEmail" placeholder="Email"
            className="regist__form-input form-page__input" id="regist-email" required
            onChange={handleEmailChange} ref={placeEmailRef}
          />
          <span id="regist-email-error" className="form-page__text-error">{errorTextEmailInput}</span>
          <input type="password" name="registInputPassword" placeholder="Пароль"
            className="regist__form-input form-page__input" id="regist-password" required
            onChange={handlePasswordChange} ref={placePasswordRef}
          />
          <span id="regist-password-error" className="form-page__text-error">{errorTextPasswordInput}</span>
          <button type="submit" className="regist__form-btn form-page__btn">Зарегистрироваться</button>
          <Link to="/signin" className="button form-page__btn-enter">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </div>
  )
}