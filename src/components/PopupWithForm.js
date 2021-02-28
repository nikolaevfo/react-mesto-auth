import React from 'react';

function PopupWithForm(props) {

  const formRef = React.useRef();

  function handlerSubmitForm(e) {
    props.onSubmit(e);
    formRef.current.reset();
  }

  let buttonText = '';
  if(props.isDeletingCard) {
    if (props.isLoading) {
      buttonText = 'Да...'
    } else {
      buttonText = 'Да'
    }
  } else {
    if (props.isLoading) {
      buttonText = 'Сохранить...'
    } else {
      buttonText = 'Сохранить'
    }
  }

  return (
    <section className={`popup root__popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container`}>
        <button type="button" className={`popup__button-cross button`} onClick={props.onClose}></button>
        <h3 className={`popup__title`}>{props.title}</h3>
        <form action="#" name={`popup${props.classDescription}Form`} className={`popup__form`} onSubmit={handlerSubmitForm} ref={formRef}>
          {props.children}
          <button
            type="submit"
            disabled={`${props.isFormValid
              ? ``
              : `true`}`}
            className={`${props.isFormValid
              ? `popup__btn-add`
              : `popup__btn-add popup__btn-add_invalid`}`}>{buttonText}</button>
        </form>
      </div>
    </section >
  );
}

export default PopupWithForm;