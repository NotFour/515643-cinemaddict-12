import Abstract from "./abstract.js";
import {SortType} from "../const";

export default class Sort extends Abstract {
  _createSortTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
        <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
      </ul>`
    );
  }

  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _getTemplate() {
    return this._createSortTemplate();
  }

  _changeActiveClass(sortType) {
    if (this._currentSortType !== sortType) {
      this._currentSortType = sortType;

      const sortButtons = Array.from(this.getElement().querySelectorAll(`.sort__button`));
      sortButtons.forEach((button) => {
        button.classList.remove(`sort__button--active`);
      });
      sortButtons.find((button) => {
        return button.dataset.sortType === this._currentSortType;
      }).classList.add(`sort__button--active`);
    }
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this._changeActiveClass(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
