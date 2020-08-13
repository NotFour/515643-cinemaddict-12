import {createElement} from "../util";

export default class FilmCount {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }

  _createFilmsCountTemplate(count) {
    return (
      `<p>${count} movies inside</p>`
    );
  }

  _getTemplate() {
    return this._createFilmsCountTemplate(this._filmsCount);
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
