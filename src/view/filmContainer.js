import {createElement} from "../util";

export default class FilmContainer {
  constructor() {
    this._element = null;
  }

  _createFilmContainerTemplate() {
    return (
      `<div class="films-list__container">`
    );
  }

  _getTemplate() {
    return this._createFilmContainerTemplate();
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