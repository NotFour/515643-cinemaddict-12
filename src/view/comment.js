import Abstract from "./abstract.js";
import {formatCommentDate} from "../utils/film";

export default class Comment extends Abstract {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  _createCommentTemplate(comment) {
    const {text, emotion, author, date} = comment;
    const currentDate = formatCommentDate(date);

    return (
      `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-puke">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${currentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
    );
  }

  _getTemplate() {
    return this._createCommentTemplate(this._comment);
  }
}
