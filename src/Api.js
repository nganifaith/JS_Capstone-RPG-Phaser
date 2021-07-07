export default class Api {
  constructor() {
    this.baseUrl =
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    this.gameId = 'bUiJgC0hdslAYf1iKJLR';
  }

  // get(url, data) {
  //   return fetch(`${this.baseUrl}/${this.gameId}/scores/`, data);
  // }

  post(url, body) {
    return fetch(`${this.baseUrl}games/${this.gameId}/${url}/`, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((res) => res.json());
  }

  createScore(user, score) {
    return this.post('scores', { user, score });
  }
}
