module.exports = function() {
  const max = 10000;
  const min = 1;
  const hits = Math.floor(Math.random() * (max - min) + min);

  return hits
    .toString()
    .split('')
    .map((number) => {
      return {
        number,
        path: `number${number}`
      };
    });
};
