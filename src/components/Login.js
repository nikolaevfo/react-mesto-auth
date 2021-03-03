import React from 'react';

export default function Login(props) {

  React.useEffect(() => {
    props.onInit('Регистрация', '/signup')
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
    props.onLogin({ email: placeEmailRef.current.value, password: placePasswordRef.current.value })
  }

  return (
    <div className="login form-page">
      <div className="form-page__container">
        <h3 className="login__title form-page__title">Вход</h3>
        <form action="#" name="loginForm" className="login__form form-page__form" onSubmit={handleSubmit}>
          <input type="email" name="loginInputEmail" placeholder="Email"
            className="login__form-input form-page__input" id="login-email" required
            onChange={handleEmailChange} ref={placeEmailRef}
          />
          <span id="login-email-error" className="form-page__text-error">{errorTextEmailInput}</span>
          <input type="password" name="loginInputPassword" placeholder="Пароль"
            className="login__form-input form-page__input" id="login-password" required
            onChange={handlePasswordChange} ref={placePasswordRef}
          />
          <span id="login-password-error" className="form-page__text-error">{errorTextPasswordInput}</span>
          <button type="submit" className="login__form-btn form-page__btn">Войти</button>
        </form>
      </div>
    </div>
  )
}