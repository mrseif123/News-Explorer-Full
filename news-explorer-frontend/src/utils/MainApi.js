class MainApi {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res, op_code) {
    switch (op_code){
      case 1:
        {
          if (res.status === 201) {
            return res.json();
          } else {
            throw new Error('409 - Unsuccessful registration');
          }
        }

      case 2:
        if (res.ok) {
          return res.json();
        }
        break;

      case 3:
          return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
          
      default:
        return;
    } 
  }

  register(email, password, name) {
    return (
      fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
          Acccept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name
        }),
      })
      .then((res) => {
        return this._checkResponse(res, 1)
      })
    );
  }

  authorize(email, password) {
    return (
      fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: {
          Acccept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          return data;
        }
      })
    );
  }

  getUserInfo() {
    return (
      fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          Acccept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        return this._checkResponse(res, 2)
      })
    );
  }

  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
        return this._checkResponse(res, 2)
    });
  }

  addArticle(article) {
    return (
      fetch(`${this._baseUrl}/articles`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(article),
      })
      .then((res) => {
        return this._checkResponse(res, 3)
      })
    );
  }

  deleteArticle(articleId, token) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
  }
}
const mainApi = new MainApi({
  baseUrl: 'https://api.mrseif12.students.nomoreparties.sbs',
  headers: {
  },
});

export default mainApi;
