class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleOriginalResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response}`);
    }
    return response.json();
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  setUserInfo(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(this._handleOriginalResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleOriginalResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  changeLikeCardStatus(id, isNotLiked){
    let methodAPI = "DELETE";
    if (isNotLiked) {
      methodAPI = 'PUT';
    }
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: methodAPI,
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleOriginalResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "528df5a2-16f1-4f0e-9003-28f33571e107",
    "Content-Type": "application/json",
  },
});

export default api;