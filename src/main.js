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

const FILM_COUNT = 5;

const bodyElement = document.body;

const headerElement = bodyElement.querySelector(`.header`);

render(headerElement, createUserInfoTemplate(), `beforeend`);

const mainElement = bodyElement.querySelector(`.main`);

render(mainElement, createNavigationTemplate(), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);

render(mainElement, createFilmsSectionTemplate(), `beforeend`);

const filmsListElement = mainElement.querySelector(`.films-list`);

render(filmsListElement, createFilmsContainerTemplate(), `beforeend`);

const filmsContainer = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsContainer, createFilmCardTemplate(), `beforeend`);
}

render(filmsListElement, createButtonShowMoreTemplate(), `beforeend`);

const footerStatisticsTemplate = bodyElement.querySelector(`.footer__statistics`);
render(footerStatisticsTemplate, createFilmsCountTemplate(), `beforeend`);

render(mainElement, createFilmPopupTemplate(), `beforeend`);
