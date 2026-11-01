/**
 * The brand mark as a 16x16 pixel grid: a night owl developer at a laptop
 * under a crescent moon. Single source for the header mark (BrandMark.jsx)
 * and the generated favicon / app icons, so they can never drift apart.
 *
 * Colours are fixed rather than theme tokens: an icon must look the same in a
 * browser tab, a bookmark and both site themes.
 */

export const PALETTE = {
  '.': null, // transparent: the background square shows through
  K: '#7b4fb0', // owl body
  D: '#a77be0', // owl belly
  W: '#ffca54', // glowing eyes
  P: '#1a1320', // pupils
  B: '#f59a3c', // beak and feet
  M: '#f3ead3', // moon
  L: '#5a4e68', // laptop
  G: '#6fcf97', // code on screen
  T: '#3a3040', // desk
};

export const BACKGROUND = '#241b2c';

/* 16 columns per row. Read top to bottom. */
export const GRID = [
  '................',
  '............MM..',
  '.K.......K.MM...',
  '.KKKKKKKKK.MM...',
  '.KWWWKWWWK..MM..',
  '.KWPWKWPWK......',
  '.KWWWBWWWK......',
  '.KKKKBKKKK......',
  '.KKDDDDDKKLLLLL.',
  '.KKDDDDDKKLGG.L.',
  '.KKDDDDDKKL.GGL.',
  '..KKKKKKK.LLLLL.',
  '...B...B.LLLLLLL',
  '.TTTTTTTTTTTTTT.',
  '................',
  '................',
];

/** Every coloured pixel as { x, y, fill }. */
export function pixels() {
  const out = [];
  GRID.forEach((row, y) => {
    [...row].forEach((key, x) => {
      const fill = PALETTE[key];
      if (fill) out.push({ x, y, fill });
    });
  });
  return out;
}
