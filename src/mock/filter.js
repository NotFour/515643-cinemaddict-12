const filmToFilterMap = {
  all: (films) => films.length,
  watchlist: (films) => films
    .filter((film) => film.filters.watchlist).length,
  history: (films) => films
    .filter((film) => film.filters.history).length,
  favorites: (films) => films
    .filter((film) => film.filters.favorites).length
};

export const generateFilter = (films) => {
  const result = {};

  Object.entries(filmToFilterMap).forEach(([filterName, func]) => {
    result[filterName] = func(films);
  });

  return result;
};
