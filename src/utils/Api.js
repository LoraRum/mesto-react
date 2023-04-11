class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._handleResponse);
    }

    updateUserInfo({ name, about }) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        });
    }

    editAvatar(data) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        });
    }

    addCard({ name, link }) {
        return this._request(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link }),
        });
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        });
    }

    removeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }

    likeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    dislikeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
    headers: {
        authorization: "6059afea-f832-4b2c-a73d-15748b82d9cd",
        "Content-Type": "application/json",
    },
});

export default api;