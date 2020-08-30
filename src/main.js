import UserInfo from "./view/userInfo.js";
import Filters from "./view/filters.js";
import FilmCount from "./view/filmCount.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import Board from "./presenter/board";

const FILM_COUNT = 11;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const bodyElement = document.body;
const headerElement = bodyElement.querySelector(`.header`);
const mainElement = bodyElement.querySelector(`.main`);

const boardPresenter = new Board(mainElement);
render(headerElement, new UserInfo(), RenderPosition.BEFOREEND);
render(mainElement, new Filters(filters), RenderPosition.BEFOREEND);
boardPresenter.init(films);

const footerStatisticsTemplate = bodyElement.querySelector(`.footer__statistics`);
render(footerStatisticsTemplate, new FilmCount(films.length), RenderPosition.BEFOREEND);
