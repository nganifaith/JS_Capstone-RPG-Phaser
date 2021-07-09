export default class Api {
  constructor() {
    this.baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    this.gameId = 'bUiJgC0hdslAYf1iKJLR';
  }

  async post(url, body) {
    try {
      const res = await fetch(`${this.baseUrl}games/${this.gameId}/${url}/`, {
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      return res.json();
    } catch (e) {
      return [];
    }
  }

  createScore(user, score) {
    return this.post('scores', { user, score });
  }

  async fetchScores() {
    try {
      const res = await fetch(`${this.baseUrl}games/${this.gameId}/scores`);

      return res.json();
    } catch (e) {
      return [];
    }
  }
}
