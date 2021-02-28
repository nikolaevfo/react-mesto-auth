import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [errorTextAvatarInput, setErrorTextAvatarInput] = React.useState('');
  // const [isFormValid, setIsFormValid] = React.useState(true);
  
  const avatarLinkRef = React.useRef();

  React.useEffect(() => {
    avatarLinkRef.current.value = currentUser.avatar || '';
    setErrorTextAvatarInput('');
  }, [currentUser, props.isOpen]); 

  // function checkInputValid(input) {
  //   if (!input.validity.valid) {
  //     setIsFormValid(false);
  //   } else {
  //     setIsFormValid(true);
  //   }
  // }

  function handleLinkChange() {
    setErrorTextAvatarInput(avatarLinkRef.current.validationMessage);
    // checkInputValid(avatarLinkRef.current);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
  });
} 
  
  return (
    <PopupWithForm
      // classDescription='avatar'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      // isFormValid={isFormValid}
      children={
        <>
          <input type="url" name="avatarInputLink" placeholder="Ссылка на картинку"
            className="popup-avatar__text popup__text popup-avatar__text_type_link popup__input" id="avatar-link" required
            onChange={handleLinkChange} ref={avatarLinkRef}
          />
          <span id="avatar-link-error" className="popup__text-error">{errorTextAvatarInput}</span>
        </>
      } 
    />
  )
}

export default EditAvatarPopup;
  