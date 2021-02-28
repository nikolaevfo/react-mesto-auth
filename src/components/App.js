import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
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
import * as auth from '../utils/auth';

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
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [headerBtnText, setHeaderBtnText] = useState('');
  const [headerLinkUrl, setHeaderLinkUrl] = useState('');

  function handleAuthInit(email, btnText, btnLink) {
    setEmail(email);
    setHeaderBtnText(btnText);
    setHeaderLinkUrl(btnLink);
  }

  function handleRegister({email, password}) {
    return auth.register(email, password)
      .then(res => {
        if (!res || res.statusCode === 400) {
          throw new Error('Некорректно заполнено одно из полей')
        } else {
          history.push('/signin');
         }
      })
  }

  function handleLogin({email, password}) {
    return auth.login(email, password)
      .then(res => {
        if (!res || res.statusCode === 400) {
          throw new Error('Не передано одно из полей')
        } else if (res.statusCode === 401) {
          throw new Error('Пользователь с email не найден')
        }
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
         }
      })
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt'); 
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (!res || res.statusCode === 400) {
            throw new Error('Токен не передан или передан не в том формате')
          } else if (res.statusCode === 401) {
            throw new Error('Переданный токен некорректен')
          }
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/main');
          }
        })
        .catch(() => history.push('/signin'));
    }
  }, []); 

  function handleSignOut() {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      setEmail('')
      setLoggedIn(false);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">

        <div className="page">
          <Header
            email={email}
            headerLinkUrl={headerLinkUrl}
            btnText={headerBtnText}
            onClick={handleSignOut}
          />
          
          <Switch>
            <ProtectedRoute
              path='/main'
              loggedIn={loggedIn}
              component={Main}
              email={email}
              onInit={handleAuthInit}
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
              <Login
                onLogin={handleLogin}
                onInit={handleAuthInit}
              />
            </Route>
            <Route path="/signup">
              <Register
                onRegister={handleRegister}
                onInit={handleAuthInit}
              />
            </Route>
            <Route exact path="/">
              {loggedIn ? <Redirect to='/main'/> : <Redirect to='signin'/>}
            </Route>
          </Switch>

          
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
        
        <Footer />
      </div >
    </CurrentUserContext.Provider>    
  );
}

export default App;
