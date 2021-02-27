import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
  const [deletedCardId, setDeletedCardId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeletingCard, setIsDeletingCard] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
      setCurrentUser(userData); 
    })
    .catch((err) => console.log("Ошибка при загрузке данных", err));
  }, [])


  // popaps opening and closing
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setIsDeletingCard(true);
    setIsDeleteCardPopupOpen(true);    
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');
    setIsDeleteCardPopupOpen(false);
    setIsDeletingCard(false);
  }

  // profile
  function handleUpdateUser(userData) {
    setIsLoading(true)
    api.setUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsLoading(false);
        closeAllPopups();
      })
  }

  // avatar
  function handleUpdateAvatar(avatarObj) {
    setIsLoading(true)
    api.setUserAvatar(avatarObj.avatar)
      .then((userData) => {
        setCurrentUser(userData); 
        setIsLoading(false);
        closeAllPopups();
    })
  }

  // cards
  React.useEffect(() => {
    api.getCardList()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.log("Ошибка при загрузке данных", err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      });
  } 

  function checkDeletedCardId(cardId) {
    setDeletedCardId(cardId);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api.deleteCard(deletedCardId)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCardId);
        setCards(newCards); 
        setIsLoading(false);
        closeAllPopups();
      })
  }

  // card
  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        setIsLoading(false);
        closeAllPopups();
    })
  }

  
  // registration and authorization
  const [loggedIn, setLoggedIn] = useState(false);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">

        <div className="page">
          <Header />
          
          <Switch>
            <ProtectedRoute
              path='/main'
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              handleCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike} 
              checkCardDelete={checkDeletedCardId}
              onCardDeleteClick={handleDeleteCardClick}
            />
            <Route path="/signin">
              <Login/>
            </Route>
            <Route path="/signup">
              <Register/>
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to='/main'/> : <Redirect to='signin'/>}
            </Route>
          </Switch>

          <Footer />
        </div>
        
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        /> 

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        isLoading={isLoading}
        isDeletingCard={isDeletingCard}
        />

      </div >
    </CurrentUserContext.Provider>    
  );
}

export default App;
