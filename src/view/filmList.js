import Abstract from "./abstract.js";

const listType = {
  allFilms: {
    list: `films-list`,
    title: `All movies. Upcoming`,
  },
  noFilms: {
    list: `films-list`,
    title: `There are no movies in our database`,
  },
  topRated: {
    list: `films-list--extra`,
    title: `Top rated`,
  },
  commented: {
    list: `films-list--extra`,
    title: `Most commented`,
  }
};

export default class FilmList extends Abstract {
  constructor(type = `allFilms`) {
    super();
    this._type = type;
  }

  _createFilmListTemplate(type) {
    const listClass = listType[type].list;
    const titleText = listType[type].title;
    const titleClass = type === `allFilms` ? `visually-hidden` : ``;

    return (
      `<section class="films-list ${listClass}">
        <h2 class="films-list__title ${titleClass}">${titleText}</h2>
      </section>`
    );
  }

  _getTemplate() {
    return this._createFilmListTemplate(this._type);
  }
}
