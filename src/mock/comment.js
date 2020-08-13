import {getRandomInteger, getRandomItems} from "../util";

const generateText = () => {
  const comments = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ];

  return getRandomItems(comments);
};

const generateEmotion = () => {
  const emotions = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  return getRandomItems(emotions)[0];
};

const generateAuthor = () => {
  const authors = [
    `Tim Macoveev`,
    `John Doe`,
  ];

  return getRandomItems(authors)[0];
};

const generateDate = (filmCreated) => {
  return new Date(getRandomInteger(60000, Date.now() - filmCreated.getTime()));
};

export const generateComment = (date) => {
  return {
    text: generateText(),
    emotion: generateEmotion(),
    author: generateAuthor(),
    date: generateDate(date),
  };
};
