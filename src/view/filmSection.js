import {createElement} from "../util";

export default class FilmSection {
  constructor(filmCount) {
    this._filmCount = filmCount;
    this._element = null;
  }

  _createFilmSectionTemplate(filmCount) {
    const title = filmCount > 0 ? `All movies. Upcoming` : `There are no movies in our database`;
    const titleClass = filmCount > 0 ? `visually-hidden` : ``;

    return (
      `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title ${titleClass}">${title}</h2>
      </section>
    </section>`
    );
  }

  _getTemplate() {
    return this._createFilmSectionTemplate(this._filmCount);
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
