import Abstract from "./abstract.js";

export default class Sort extends Abstract {
  _createSortTemplate() {
    return (
      `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
    );
  }

  _getTemplate() {
    return this._createSortTemplate();
  }
}
