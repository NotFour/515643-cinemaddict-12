import Comment from "./comment.js";
import SmartView from "./smart.js";
import {createElement, render, RenderPosition} from "../utils/render.js";
import {getFormatedDate} from "../utils/film.js";

export default class FilmPopup extends SmartView {
  constructor(film) {
    super();

    this._data = FilmPopup.parseFilmToData(film);

    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);

    this._emotionToggleHandler = this._emotionToggleHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._setInnerHandlers();
  }

  _createGenresTemplate(genres) {
    let result = ``;

    for (let i = 0; i < genres.length; i++) {
      result += `<span class="film-details__genre">${genres[i]}</span>`;
    }

    return result;
  }

  _renderComments(comments) {
    const commentsList = this.getElement().querySelector(`.film-details__comments-list`);

    comments
      .forEach((comment) => render(commentsList, new Comment(comment).getElement(), RenderPosition.BEFOREEND));
  }

  _createFilmPopupTemplate(data) {
    const {name, rating, poster, release, duration, genre, description, makers, restrictions, filters, comments, currentEmotion, commentText} = data;

    const publicName = name.public;
    const originalName = `Original: ${name.original}`;
    const writers = makers.screenwriters.join(`, `);
    const actors = makers.actors.join(`, `);
    const genreTitle = genre.length === 1 ? `Genre` : `Genres`;
    const genres = this._createGenresTemplate(genre);
    const isWatchList = filters.watchlist ? `checked` : ``;
    const isWatched = filters.history ? `checked` : ``;
    const isFavorite = filters.favorites ? `checked` : ``;
    const releaseYear = getFormatedDate(release.date);
    const commentsCount = comments.length;
    const currentEmotionElem = currentEmotion ? `<img src="images/emoji/${currentEmotion}.png" width="55" height="55" alt="emoji-${currentEmotion}">` : ``;
    const currentEmotionToChecked = {
      'smile': ``,
      'sleeping': ``,
      'puke': ``,
      'angry': ``
    };

    if (currentEmotion) {
      currentEmotionToChecked[currentEmotion] = `checked`;
    }

    return (
      `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=".${poster}" alt="">

              <p class="film-details__age">${restrictions}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${publicName}</h3>
                  <p class="film-details__title-original">${originalName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${makers.producer}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseYear}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${release.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genreTitle}</td>
                  <td class="film-details__cell">
                    ${genres}
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchList}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">${currentEmotionElem}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentText}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${currentEmotionToChecked[`smile`]}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${currentEmotionToChecked[`sleeping`]}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${currentEmotionToChecked[`puke`]}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${currentEmotionToChecked[`angry`]}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
    );
  }

  _getTemplate() {
    return this._createFilmPopupTemplate(this._data);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
      this._renderComments(this._data.comments);
    }

    return this._element;
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(FilmPopup.parseDataToFilm(this._data));
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchlistClickHandler);
  }

  _emotionToggleHandler(evt) {
    if (evt.target.classList.contains(`film-details__emoji-item`)) {
      this.updateData({
        currentEmotion: evt.target.value
      });
    }
  }

  reset(film) {
    this.updateData(
        FilmPopup.parseFilmToData(film)
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClickHandler(this._callback.click);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, this._emotionToggleHandler);
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          currentEmotion: `smile`,
          commentText: ``,
        }
    );
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      commentText: evt.target.value
    }, true);
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    if (data.commentText) {
      data.comments.push({
        text: data.commentText,
        emotion: data.currentEmotion,
        author: `me`,
        date: Date.now()
      });
    }

    delete data.commentText;
    delete data.currentEmotion;

    return data;
  }
}
