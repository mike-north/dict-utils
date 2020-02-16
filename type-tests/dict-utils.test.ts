import { dictMap, dictReduce, dictFilter, dictForEach } from 'dict-utils';
import { Dict } from '@mike-north/types';

function reduceTestOne() {
  const toReduce: Dict<string[]> = {
    d: ['a', 'a', 'a'],
    e: ['a', 'b', 'b'],
    f: ['a', 'a', 'c'],
  };

  dictReduce(
    toReduce,
    (acc, val, key, dict) => {
      acc; // $ExpectType [string][]
      key; // $ExpectType string | number
      val; // $ExpectType string[]
      dict; // $ExpectType Dict<string[]>
      acc.push(['' + key]);
      return acc;
    },
    [[''] as [string]],
  );

  dictReduce({}, x => x, '');

  dictReduce(any); // $ExpectError
  dictReduce({}, () => {}, ''); // $ExpectError
  dictReduce(null, () => {}, ''); // $ExpectError
  dictReduce(undefined, () => {}, ''); // $ExpectError
  dictReduce('', () => {}, ''); // $ExpectError
  dictReduce([3], () => {}, ''); // $ExpectError
}

function filterTestOne() {
  const toFilter: Dict<number | boolean> = {
    d: 31,
    e: false,
    f: -4,
  };

  dictFilter(toFilter, (val, key, dict) => {
    val; // $ExpectType number | boolean
    key; // $ExpectType string | number
    dict; // $ExpectType Dict<number | boolean>
    return true;
  });

  function isNumber(val: any): val is number {
    return typeof val === 'number';
  }
  function isBoolean(val: any): val is boolean {
    return typeof val === 'boolean';
  }

  dictFilter(toFilter, isNumber); // $ExpectType Dict<number>
  dictFilter(toFilter, isBoolean); // $ExpectType Dict<boolean>

  dictFilter({}, () => false);

  dictFilter(any); // $ExpectError
  dictFilter({}, () => {}, ''); // $ExpectError
  dictFilter(null, () => {}, ''); // $ExpectError
  dictFilter(undefined, () => {}, ''); // $ExpectError
  dictFilter('', () => {}, ''); // $ExpectError
  dictFilter([3], () => {}, ''); // $ExpectError
}

function mapTestOne() {
  const toMap: Dict<number | boolean> = {
    d: 31,
    e: false,
    f: -4,
  };

  dictMap(toMap, (val, key, dict) => {
    val; // $ExpectType number | boolean
    key; // $ExpectType string | number
    dict; // $ExpectType Dict<number | boolean>
    return '' + val;
  });

  dictMap(toMap, x => (typeof x === 'number' ? ([x] as [number]) : x)); // $ExpectType Dict<boolean | [number]>
  dictMap(toMap, x => '' + x); // $ExpectType Dict<string>

  dictMap(any); // $ExpectError
  dictMap({}, () => {}, ''); // $ExpectError
  dictMap(null, () => {}, ''); // $ExpectError
  dictMap(undefined, () => {}, ''); // $ExpectError
  dictMap('', () => {}, ''); // $ExpectError
  dictMap([3], () => {}, ''); // $ExpectError
}

function forEachTestOne() {
  const toIterate: Dict<number | boolean> = {
    d: 31,
    e: false,
    f: -4,
  };

  dictForEach(toIterate, (val, key, dict) => {
    val; // $ExpectType number | boolean
    key; // $ExpectType string | number
    dict; // $ExpectType Dict<number | boolean>
    return '' + val;
  });

  dictForEach(toIterate, x => (typeof x === 'number' ? ([x] as [number]) : x)); // $ExpectType void
  dictForEach(toIterate, x => '' + x); // $ExpectType void

  dictForEach(any); // $ExpectError
  dictForEach({}, () => {}, ''); // $ExpectError
  dictForEach(null, () => {}, ''); // $ExpectError
  dictForEach(undefined, () => {}, ''); // $ExpectError
  dictForEach('', () => {}, ''); // $ExpectError
  dictForEach([3], () => {}, ''); // $ExpectError
}
