import {createElement} from "../util";

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  _createLoadMoreButtonTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  _getTemplate() {
    return this._createLoadMoreButtonTemplate();
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