import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  

  return (
    <div className="regist form-page">
      <div className="form-page__container">
        <h3 className="regist__title form-page__title">Регистрация</h3>
        <form action="#" name="registForm" className="regist__form form-page__form" >
          <input type="email" name="registInputEmail" placeholder="Email"
            className="regist__form-input form-page__input" id="regist-email" required />
          <span id="regist-email-error" className="form-page__text-error"></span>
          <input type="password" name="registInputPassword" placeholder="Пароль"
            className="regist__form-input form-page__input" id="regist-password" required />
          <span id="regist-password-error" className="form-page__text-error"></span>
          <button type="submit" className="regist__form-btn form-page__btn">Зарегистрироваться</button>
          <Link to="/signin" className="button form-page__btn-enter">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </div>
  )
}