import {createUserInfoTemplate} from "./view/userInfo";
import {createNavigationTemplate} from "./view/navigation";
import {createSortTemplate} from "./view/sortMenu";
import {createFilmCardTemplate} from "./view/filmCard";
import {createFilmsCountTemplate} from "./view/filmsCount";
import {createFilmPopupTemplate} from "./view/filmPopup";
import {createFilmsSectionTemplate} from "./view/filmSection";
import {createButtonShowMoreTemplate} from "./view/showMore";
import {createFilmsContainerTemplate} from "./view/filmContainer";
import {render} from "./util";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";

const FILM_COUNT = 11;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const bodyElement = document.body;

const headerElement = bodyElement.querySelector(`.header`);

render(headerElement, createUserInfoTemplate(), `beforeend`);

const mainElement = bodyElement.querySelector(`.main`);

render(mainElement, createNavigationTemplate(filters), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);

render(mainElement, createFilmsSectionTemplate(), `beforeend`);

const filmsListElement = mainElement.querySelector(`.films-list`);

render(filmsListElement, createFilmsContainerTemplate(), `beforeend`);

const filmsContainer = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsContainer, createFilmCardTemplate(films[i]), `beforeend`);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(filmsListElement, createButtonShowMoreTemplate(), `beforeend`);

  const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsContainer, createFilmCardTemplate(film), `beforeend`));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

const footerStatisticsTemplate = bodyElement.querySelector(`.footer__statistics`);
render(footerStatisticsTemplate, createFilmsCountTemplate(filters.all), `beforeend`);

render(mainElement, createFilmPopupTemplate(films[0]), `beforeend`);
