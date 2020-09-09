import {render, replace, remove, RenderPosition} from "../utils/render.js";
import FilmCard from "../view/filmCard";
import FilmPopup from "../view/filmPopup";

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class Film {
  constructor(filmContainer, boardContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._boardContainer = boardContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handlePopupClick = this._handlePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCard(film);
    this._filmPopupComponent = new FilmPopup(film);

    this._filmCardComponent.setClickHandler(this._handleCardClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    this._filmPopupComponent.setClickHandler(this._handlePopupClick);
    this._filmPopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmPopupComponent.setWatchlistClickHandler(this._handleWatchlistClick);

    if (prevFilmCardComponent === null || prevFilmPopupComponent === null) {
      render(this._filmContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    replace(this._filmCardComponent, prevFilmCardComponent);

    if (this._mode === Mode.POPUP) {
      replace(this._filmPopupComponent, prevFilmPopupComponent);
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _openPopup() {
    this._boardContainer.appendChild(this._filmPopupComponent.getElement());
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _closePopup() {
    this._boardContainer.removeChild(this._filmPopupComponent.getElement());
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._filmPopupComponent.reset(this._film);
      this._closePopup();
    }
  }

  _handleCardClick() {
    this._openPopup();
  }

  _handlePopupClick(film) {
    this._changeData(film);
    this._closePopup();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              filters: {
                watchlist: this._film.filters.watchlist,
                history: this._film.filters.history,
                favorites: !this._film.filters.favorites
              }
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              filters: {
                watchlist: this._film.filters.watchlist,
                history: !this._film.filters.history,
                favorites: this._film.filters.favorites
              }
            }
        )
    );
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              filters: {
                watchlist: !this._film.filters.watchlist,
                history: this._film.filters.history,
                favorites: this._film.filters.favorites
              }
            }
        )
    );
  }
}
