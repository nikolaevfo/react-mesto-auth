import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
          <div className="profile__avatar-bg"></div>
        </div>
        <div className="profile__info">
          <div className="profile__info-row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button button" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {props.cards.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            card={item}
            onCardClick={props.handleCardClick}
            onCardLike={props.onCardLike}
            checkCardDelete={props.checkCardDelete}
            onCardDeleteClick={props.onCardDeleteClick}
          />
        ))}
      </section>

    </main >
  );
}

export default Main;
