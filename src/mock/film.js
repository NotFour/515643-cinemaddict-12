import {getRandomInteger, getRandomItems} from "../util";
import {generateComment} from "./comment";

const generateFilmName = () => {
  const filmNames = [
    {
      public: `Во все тяжкие`,
      original: `briking bad`
    },
    {
      public: `Один дома`,
      original: `One alone`
    },
    {
      public: `Малефисента`,
      original: `Malefisenta`
    },
    {
      public: `Призраки дома на холме`,
      original: `Ghosts on holm`
    }
  ];

  return getRandomItems(filmNames)[0];
};

const generateImgPath = () => {
  const filmPosters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ];

  return `/images/posters/${getRandomItems(filmPosters)[0]}`;
};

const generateDuration = () => {
  const hours = getRandomInteger(1, 3);
  const minutes = getRandomInteger(10, 59);

  return `${hours}h ${minutes}m`;
};

const generateGenre = () => {
  const genres = [`Comedy`, `Drama`, `Western`, `Musical`, `Cartoon`];

  return getRandomItems(genres, getRandomInteger(1, 3));
};

const generateMakers = () => {
  const producers = [
    `Mikel Radriges`,
    `Crystian Bale`,
    `Jenifer Lopes`
  ];

  const screenwriters = [
    `Tom Crus`,
    `Jeniffer Lowrance`,
    `Tim Berton`
  ];

  const actors = [
    `Kira Naitly`,
    `OnePunchMan`,
    `Jaky Chan`,
    `Angelina Joly`,
    `Mila Cynis`
  ];

  return {
    producer: getRandomItems(producers)[0],
    screenwriters: getRandomItems(screenwriters, 2),
    actors: getRandomItems(actors, 3)
  };
};

const generateRelease = () => {
  const date = {
    year: getRandomInteger(1800, 2020),
    month: getRandomInteger(0, 11),
    day: getRandomInteger(1, 28),
    hour: getRandomInteger(0, 23),
    minutes: getRandomInteger(1, 59),
    seconds: getRandomInteger(1, 59)
  };

  const countries = [
    `Russia`,
    `USA`,
    `UK`,
    `Scotland`
  ];

  return {
    date: new Date(...Object.values(date)),
    country: getRandomItems(countries)[0]
  };
};

const generateAgeRestrictions = () => {
  const restrictions = [0, 6, 12, 16, 18, 21];

  return `${getRandomItems(restrictions)[0]}+`;
};

const generateDescription = () => {
  const descriptions =
    [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      `Cras aliquet varius magna, non porta ligula feugiat eget.`,
      `Fusce tristique felis at fermentum pharetra. `,
      `Aliquam id orci ut lectus varius viverra.`,
      `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
      `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
      `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
      `Sed sed nisi sed augue convallis suscipit in sed felis.`,
      `Aliquam erat volutpat.`,
      `Nunc fermentum tortor ac porta dapibus.`,
      `In rutrum ac purus sit amet tempus.`
    ];
  const result = getRandomItems(descriptions, getRandomInteger(1, 5));

  return typeof result === `string` ? result : result.join(` `);
};

const generateFilters = () => {
  return {
    watchlist: getRandomInteger(0, 1),
    history: getRandomInteger(0, 1),
    favorites: getRandomInteger(0, 1)
  };
};

export const generateFilm = () => {
  const film = {
    name: generateFilmName(),
    poster: generateImgPath(),
    makers: generateMakers(),
    rating: `${getRandomInteger(1, 10)}.${getRandomInteger(0, 9)}`,
    release: generateRelease(),
    duration: generateDuration(),
    genre: generateGenre(),
    description: generateDescription(),
    restrictions: generateAgeRestrictions(),
    filters: generateFilters(),
    comments: [],
  };

  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    film.comments.push(generateComment(film.release.date));
  }

  return film;
};
