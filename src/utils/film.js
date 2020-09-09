import moment from "moment";

export const getFormatedDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (date) => {
  if (!(date instanceof Date)) {
    return ``;
  }


  const dayAgoToString = {
    0: `Today`,
    1: `1 day ago`,
    2: `2 days ago`
  };

  const dayAgo = Math.floor((Date.now() - date) / 1000 / 3600 / 24);

  return dayAgo < 3 ? dayAgoToString[dayAgo] : moment(date).format(`YYYY/MM/DD HH:mm`);
};

export const formatDuration = (minutes) => {
  const currentDuration = moment.utc().startOf(`day`).add(minutes, `minutes`);

  return `${currentDuration.format(`h`)}h ${currentDuration.format(`mm`)}m`;
};

export const sortFilmDate = (taskA, taskB) => {
  return taskB.release.date.getTime() - taskA.release.date.getTime();
};

export const sortFilmRating = (taskA, taskB) => {
  return taskB.rating - taskA.rating;
};
