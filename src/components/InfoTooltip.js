import React from 'react';
import imgSuccess from '../images/regist-success.svg';
import imgError from '../images/regist-error.svg';

function InfoTooltip(props) {
  
  return (
    <section className={`popup root__popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container`}>
        <button type="button" className={`popup__button-cross button`} onClick={props.onClose}></button>
        <img src={props.isAuthSuccess ? imgSuccess : imgError} alt={props.isAuthSuccess ? 'Успешно' : 'Ошибка'} className="popup__img" />
        <h3 className={`popup__title popup__title_cener`}>{props.isAuthSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
      </div>
    </section >
  )
}

export default InfoTooltip;