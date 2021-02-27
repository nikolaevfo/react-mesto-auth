import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const isLikedAnyBody = props.card.likes.length !== 0;

  const cardDeleteButtonClassName = (
  `card__trash button ${isOwn ? 'card__trash_visible' : 'card__trash_hidden'}`
); 
  const cardLikeButtonClassName = (
  `card__like button ${isLiked ? 'card__like_active' : 'card__like_hidden'}`
); 
  const cardLikeQuantityClassName = (
    `card__like-quantity ${isLikedAnyBody ? 'card__like-quantity_visible' : 'card__like-quantity_hidden'}`
  ); 

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick(){
    props.onCardLike(props.card);
  }

  function handleDeleteClick(e) {
    props.checkCardDelete(e.target.id); 
    props.onCardDeleteClick();
  }

  return (
    <article className="card" >
      <button type="button" className={ cardDeleteButtonClassName } onClick={handleDeleteClick} id={props.id}></button>
      <div className="card__img" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleClick}></div>
      <div className="card__row">
        <h3 className="card__title">{props.card.name}</h3>
        <div className="card__like-items">
          <button type="button" className={ cardLikeButtonClassName } onClick={handleLikeClick}></button>
          <p className={ cardLikeQuantityClassName }>{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
