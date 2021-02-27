import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
  

  return (
    <div className="login form-page">
      <div className="form-page__container">
        <h3 className={`login__title form-page__title`}>Вход</h3>
        <form action="#" name={`loginForm`} className={`login__form form-page__form`} >
          <input type="email" name="loginInputEmail" placeholder="Email"
            className="login__form-input form-page__input" id="login-email" required
          />
          <span id="login-email-error" className="form-page__text-error"></span>
          <input type="password" name="loginInputPassword" placeholder="Пароль"
          className="login__form-input form-page__input" id="login-password" required
          />
          <span id="login-password-error" className="form-page__text-error"></span>
          <button type="submit" className={`login__form-btn form-page__btn`}>Войти</button>
        </form>
      </div>
    </div>
  )
}