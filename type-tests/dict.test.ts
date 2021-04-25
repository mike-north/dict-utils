// eslint-disable-next-line import/no-unresolved
import {
  mapDict,
  filterDict,
  reduceDict,
  forEachDict,
} from '@mike-north/dict-utils';
import { Dict } from '@mike-north/types';

const x: Dict<number> = {};
mapDict(x, (n) => [n, n]); // $ExpectType Dict<number[]>
reduceDict(x, (sum, i) => sum + i, 0); // $ExpectType number
filterDict(x, (x) => x > 0); // $ExpectType Dict<number>

const numbersOrNulls: Dict<number | string> = {
  a: 4,
  b: 's',
  c: 33,
  d: 'dd',
};

function isNumber(n: number | string): n is number {
  return typeof n === 'number';
}

filterDict(numbersOrNulls, isNumber); // $ExpectType Dict<number>
