import Abstract from "./abstract.js";

export default class LoadMoreButton extends Abstract {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  _createLoadMoreButtonTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  _getTemplate() {
    return this._createLoadMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
