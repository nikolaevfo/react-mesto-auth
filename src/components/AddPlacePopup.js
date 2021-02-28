import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [errorTextPlaceInput, setErrorTextPlaceInput] = React.useState('');
  const [errorTextLinkInput, setErrorTextLinkInput] = React.useState('');
  // const [isFormValid, setIsFormValid] = React.useState(false);

  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();

  React.useEffect(() => {
    placeNameRef.current.value = '';
    placeLinkRef.current.value = '';
    setErrorTextPlaceInput('');
    setErrorTextLinkInput('');
  }, [props.isOpen]); 

  // function checkInputValid(input) {
  //   if (!input.validity.valid) {
  //     setIsFormValid(false);
  //   } else {
  //     setIsFormValid(true);
  //   }
  // }

  function handlePlaceNameChange() {
    setErrorTextPlaceInput(placeNameRef.current.validationMessage);
    // checkInputValid(placeNameRef.current);
  }
  function handlePlaceLinkChange() {
    setErrorTextLinkInput(placeLinkRef.current.validationMessage);
    // checkInputValid(placeLinkRef.current);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value,
    });
  }
  
  return (
    <PopupWithForm
      // classDescription='card'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      // isFormValid={isFormValid}
      children={
        <>
          <input type="text" name="popupInputPlace" placeholder="Название"
            className="popup-card__text popup__text popup-card__text_type_place popup__input" id="card-place" required
            minLength="2" maxLength="30"
            onChange={handlePlaceNameChange} ref={placeNameRef}
          />
          <span id="card-place-error" className="popup__text-error">{errorTextPlaceInput}</span>
          <input type="url" name="popupInputLink" placeholder="Ссылка на картинку"
            className="popup-card__text popup__text popup-card__text_type_link popup__input" id="card-link" required
            onChange={handlePlaceLinkChange} ref={placeLinkRef}
          />
          <span id="card-link-error" className="popup__text-error">{errorTextLinkInput}</span>
        </>
      }
    />
  )
  
}

export default AddPlacePopup;
  