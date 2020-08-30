import Abstract from "./abstract.js";

export default class FilmContainer extends Abstract {

  _createFilmContainerTemplate() {
    return (
      `<div class="films-list__container"></div>`
    );
  }

  _getTemplate() {
    return this._createFilmContainerTemplate();
  }
}
