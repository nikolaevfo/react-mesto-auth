import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard()
} 
  
  return (
    <PopupWithForm
      title='Вы уверены?'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isDeletingCard={props.isDeletingCard}
      isFormValid={true}
      children={
        <></>
      } 
    />
  )
}

export default DeleteCardPopup;
  