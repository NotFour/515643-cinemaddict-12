import Abstract from "./abstract.js";

export default class FilmCount extends Abstract {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  _createFilmsCountTemplate(count) {
    return (
      `<p>${count} movies inside</p>`
    );
  }

  _getTemplate() {
    return this._createFilmsCountTemplate(this._filmsCount);
  }
}
