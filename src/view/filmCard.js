import Abstract from "./abstract.js";
import {formatDuration} from "../utils/film";

export default class FilmCard extends Abstract {
  constructor(film) {
    super();

    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  _createFilmCardTemplate(film) {
    const {name, rating, poster, release, duration, genre, description, filters, comments} = film;

    const currentDuration = formatDuration(duration);
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
        <span class="film-card__duration">${currentDuration}</span>
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

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }
}
