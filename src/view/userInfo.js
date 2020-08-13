import {createElement} from "../util";

export default class UserInfo {
  constructor() {
    this._element = null;
  }

  _createUserInfoTemplate() {
    return (
      `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    );
  }

  _getTemplate() {
    return this._createUserInfoTemplate();
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