import React from 'react';

function PopupWithForm(props) {  

  const formRef = React.useRef();
  const [isFormValid, setIsFormValid] = React.useState(true);

  function handlerSubmitForm(e) {
    props.onSubmit(e);
    formRef.current.reset();
  }

  // React.useEffect(() => {    
  //   console.log(formRef.current.checkValidity());
  //   setIsFormValid(formRef.current.checkValidity())
  // }, []); 

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
    <section className={`popup-${props.classDescription} popup root__popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup-${props.classDescription}__container popup__container`}>
        <button type="button" className={`popup__button-cross popup-${props.classDescription}__button-cross button`} onClick={props.onClose}></button>
        <h3 className={`popup-${props.classDescription}__title popup__title`}>{props.title}</h3>
        <form action="#" name={`popup${props.classDescription}Form`} className={`popup-${props.classDescription}__form popup__form`} onSubmit={handlerSubmitForm} ref={formRef}>
          {props.children}
          <button
            type="submit"
            disabled={`${isFormValid
              ? ``
              : `true`}`}
            className={`${isFormValid
              ? `popup__btn-add`
              : `popup__btn-add popup__btn-add_invalid`}`}>{buttonText}</button>
        </form>
      </div>
    </section >
  );
}

export default PopupWithForm;