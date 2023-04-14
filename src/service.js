export default class MovieService {
  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=cd28b874038213b9d99f6a967671e4df';
  }

  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Could not fetch ${url}`, `received ${res.status}`);

    return await res.json();
  }

  async getAllMovies(urlPage, urlQuery) {
    const urlRes = this._apiBase + `&page=${urlPage}` + `&query=${urlQuery}`;
    const res = await this.getResource(urlRes);
    return res;
  }

  async guestSession() {
    const res = await fetch(
      'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=cd28b874038213b9d99f6a967671e4df'
    );
    const guestRes = await res.json();

    return guestRes;
  }

  async getGuestSessionId() {
    const res = await this.guestSession();
    // const suck = await res.json();
    return res['guest_session_id'];
  }
}
