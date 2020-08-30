import Sort from "../view/sort.js";
import FilmSection from "../view/filmSection.js";
import FilmContainer from "../view/filmContainer.js";
import {render, RenderPosition} from "../utils/render.js";
import FilmList from "../view/filmList.js";
import FilmCard from "../view/filmCard";
import FilmPopup from "../view/filmPopup";
import {remove} from "../utils/render";
import LoadMoreButton from "../view/load-more-button";
import {SortType} from "../const";
import {sortFilmDate, sortFilmRating} from "../utils/film";

const FILM_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new Sort();
    this._filmSection = new FilmSection();
    this._filmContainer = new FilmContainer();
    this._loadMoreButtonComponent = new LoadMoreButton();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    this._renderSort();
    render(this._boardContainer, this._filmSection, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._boardFilms.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._boardFilms.sort(sortFilmRating);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film) {
    const filmComponent = new FilmCard(film);
    const filmPopupComponent = new FilmPopup(film);

    const openPopup = () => {
      this._boardContainer.appendChild(filmPopupComponent.getElement());
    };

    const closePopup = () => {
      this._boardContainer.removeChild(filmPopupComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmComponent.setClickHandler(() => {
      openPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmPopupComponent.setClickHandler(() => {
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._filmContainer, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _renderNoFilms() {
    this._filmList = new FilmList(`noFilms`);
    render(this._filmSection, this._filmList, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmList, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearFilmList() {
    this._filmContainer.getElement().innerHTML = ``;
    remove(this._loadMoreButtonComponent);
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILM_COUNT_PER_STEP));

    if (this._boardFilms.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._filmList = new FilmList();
    render(this._filmSection, this._filmList, RenderPosition.BEFOREEND);
    render(this._filmList, this._filmContainer, RenderPosition.BEFOREEND);

    this._renderFilmList();
  }
}
