export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomItems = (items, count = 1) => {
  const itemsList = items.slice();

  let result = [];

  for (let i = 0; i < count; i++) {
    const index = getRandomInteger(0, itemsList.length - 1);

    result.push(itemsList[index]);
    itemsList.splice(index, 1);
  }

  return result;
};