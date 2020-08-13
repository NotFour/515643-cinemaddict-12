import {createElement} from "../util";

export default class FilmSection {
  constructor() {
    this._element = null;
  }

  _createFilmSectionTemplate() {
    return (
      `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>
    </section>`
    );
  }

  _getTemplate() {
    return this._createFilmSectionTemplate();
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
