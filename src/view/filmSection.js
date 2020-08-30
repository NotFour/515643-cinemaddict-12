import Abstract from "./abstract.js";

export default class FilmSection extends Abstract {
  _createFilmSectionTemplate() {
    return (
      `<section class="films"></section>`
    );
  }

  _getTemplate() {
    return this._createFilmSectionTemplate();
  }
}
