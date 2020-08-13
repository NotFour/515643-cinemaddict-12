import {createElement} from "../util";

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  _createFilmCardTemplate(film) {
    const {name, rating, poster, release, duration, genre, description, filters, comments} = film;

    const MAX_DESCRIPTION_LENGTH = 140;
    const publicName = name.public;
    const releaseYear = release.date.getFullYear();
    const mainGenre = genre[0];
    const currentComments = comments.length === 1 ? `1 comment` : `${comments.length} comments`;
    const isWatchList = filters.watchlist ? `film-card__controls-item--active` : ``;
    const isWatched = filters.history ? `film-card__controls-item--active` : ``;
    const isFavorite = filters.favorites ? `film-card__controls-item--active` : ``;
    const littleDescription = description.length > MAX_DESCRIPTION_LENGTH ? `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)}...` : description;

    return (
      `<article class="film-card">
      <h3 class="film-card__title">${publicName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${mainGenre}</span>
      </p>
      <img src=".${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${littleDescription}</p>
      <a class="film-card__comments">${currentComments}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchList}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite}">Mark as favorite</button>
      </form>
    </article>`
    );
  }

  _getTemplate() {
    return this._createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
