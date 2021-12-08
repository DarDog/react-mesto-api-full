class Auth {
  constructor(option) {
    this._BASE_URL = option.baseUrl;
  }


  setNewUser(password, email) {
    return fetch(`${this._BASE_URL}/signup`, {
      headers: {
        "Content-type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({password, email}),
    })
        .then(res => {
          return this._getResponseData(res)
        })
  }

  authorization(password, email) {
    return fetch(`${this._BASE_URL}/signin`, {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({email, password})
    })
        // .then(res => {
        //   return this._getResponseData(res)
        // })
  }

  getUserInfo() {
    return fetch(`${this._BASE_URL}/users/me`, {
      credentials: 'include',
      headers: {
        "Content-type": "application/json",
      }
    })
        .then(res => {
          return this._getResponseData(res)
        })
  }


  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res}`)
    }
  }
}

export const auth = new Auth({
  baseUrl: 'https://api.mesto.subb.nomoredomains.rocks',
});
