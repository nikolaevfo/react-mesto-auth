import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [errorTextNameInput, setErrorTextNameInput] = React.useState('');
  const [errorTextAboutInput, setErrorTextAboutInput] = React.useState('');

  const inputNameRef = React.useRef();
  const inputAboutRef = React.useRef();

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]); 

  function handleNameChange(e) {
    setName(e.target.value);
    setErrorTextNameInput(inputNameRef.current.validationMessage)
    console.log(inputNameRef.current);
  }
  
  function handleDescriptionChange(e) {
    setDescription(e.target.value)
    setErrorTextAboutInput(inputAboutRef.current.validationMessage)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      classDescription='profile'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      children={
        <>
          <input type="text" name="popupInputName" placeholder="Введите Ваше имя"
            className="popup-profile__text popup__text popup-profile__text_type_name popup__input" id="profile-name" required
            minLength="2" maxLength="40" onChange={handleNameChange} value={name} ref={inputNameRef} />
          <span id="$profile-name-error" className="popup__text-error">{errorTextNameInput}</span>
          <input type="text" name="popupInputJob" placeholder="Введите Вашу профессию"
            className="popup-profile__text popup__text popup-profile__text_type_profession popup__input" id="profile-job"
            required minLength="2" maxLength="200" onChange={handleDescriptionChange} value={description} ref={inputAboutRef} />
          <span id="profile-job-error" className="popup__text-error">{errorTextAboutInput}</span>
        </>
      }
    />
  )
}

export default EditProfilePopup;