const SN_IDENTIFIER = [
  'boy',
  'boi',
  'gurl',
  'kid',
  'guy',
  'hero',
  'queen',
  'king',
  'at_bat'
];
const SN_THING = [
  'pony',
  'bizness',
  'lax',
  'soccer',
  'books',
  'gamer',
  'the_chillness'
];

// Get one item from an array
const pluck = (array) => array[Math.floor(Math.random() * array.length)];

// Alternate case
const alternateCase = (string) =>
  string
    .toLowerCase()
    .split('')
    .map((character, index) => {
      if (index % 2 === 0) return character.toUpperCase();
      return character;
    })
    .join('');

const addHugsAndKisses = (string) => {
  const timesRepeated = Math.floor(Math.random() * 2) + 1;
  const frontHalf = 'xO';
  const backHalf = 'Ox';

  return `${frontHalf.repeat(timesRepeated)}_${string}_${backHalf.repeat(
    timesRepeated
  )}`;
};

const addNumber = (string) => {
  const num = Math.floor(Math.random() * 100) + 10;
  return `${string}_${num}`;
};

const screenNameGenerator = () => {
  const identifier = pluck(SN_IDENTIFIER);
  const thing = pluck(SN_THING);
  let sn = addNumber(`${thing}_${identifier}`);
  if (Math.random() < 0.25) sn = alternateCase(sn);
  if (Math.random() < 0.35) sn = addHugsAndKisses(sn);

  return sn;
};

module.exports = () => {
  const data = [
    {
      message: 'Woah this page is so great!!!',
      author: screenNameGenerator()
    },
    {
      message: 'You truly are a great great business application developer',
      author: screenNameGenerator()
    },
    {
      message: 'I love these updates!!',
      author: screenNameGenerator()
    }
  ];

  return data;
};
