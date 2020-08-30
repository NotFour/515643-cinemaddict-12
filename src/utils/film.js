export const getFormatedDate = (date) => {
  const months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[monthIndex]} ${year}`;
};

export const sortFilmDate = (taskA, taskB) => {
  return taskB.release.date.getTime() - taskA.release.date.getTime();
};

export const sortFilmRating = (taskA, taskB) => {
  return taskB.rating - taskA.rating;
};
