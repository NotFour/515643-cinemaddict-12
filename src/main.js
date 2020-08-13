import UserInfo from "./view/userInfo";
import Filters from "./view/filters";
import Sort from "./view/sort";
import FilmCard from "./view/filmCard";
import FilmPopup from "./view/filmPopup";
import FilmSection from "./view/filmSection";
import LoadMoreButton from "./view/load-more-button";
import FilmContainer from "./view/filmContainer";
import FilmCount from "./view/filmCount";
import {render, RenderPosition} from "./util";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";

const FILM_COUNT = 11;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const bodyElement = document.body;

const headerElement = bodyElement.querySelector(`.header`);

render(headerElement, new UserInfo().getElement(), `beforeend`);

const mainElement = bodyElement.querySelector(`.main`);

render(mainElement, new Filters(filters).getElement(), `beforeend`);
render(mainElement, new Sort().getElement(), `beforeend`);

const renderFilm = (filmContainer, film) => {
  const filmComponent = new FilmCard(film);
  const filmPopupComponent = new FilmPopup(film);

  const openPopup = () => {
    mainElement.appendChild(filmPopupComponent.getElement());
  };

  const closePopup = () => {
    mainElement.removeChild(filmPopupComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    openPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    openPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    openPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmPopupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardFilms) => {
  const filmSection = new FilmSection(boardFilms.length);
  const filmContainer = new FilmContainer();

  render(boardContainer, filmSection.getElement(), RenderPosition.BEFOREEND);
  const filmsListElement = mainElement.querySelector(`.films-list`);
  render(filmsListElement, filmContainer.getElement(), RenderPosition.BEFOREEND);


  boardFilms
    .slice(0, Math.min(boardFilms.length, FILM_COUNT_PER_STEP))
    .forEach((boardFilm) => renderFilm(filmContainer.getElement(), boardFilm));


  if (boardFilms.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButton();

    render(filmsListElement, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardFilms
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((boardFilm) => renderFilm(filmContainer.getElement(), boardFilm));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= boardFilms.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};


const footerStatisticsTemplate = bodyElement.querySelector(`.footer__statistics`);
render(footerStatisticsTemplate, new FilmCount(films.length).getElement(), `beforeend`);

renderBoard(mainElement, films);
