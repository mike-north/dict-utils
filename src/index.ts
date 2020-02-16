/**
 * @packageDocumentation Utilities for working with simple JS and TS dictionaries
 */

import { Dict as _dict } from '@mike-north/types';

/**
 * @public
 */
export type Dict<T> = _dict<T>;

function keys<T>(obj: T): (keyof T)[] {
  return (Object.keys(obj) as any) as (keyof T)[];
}

/**
 * Reducer function
 * @template T - item type, of the collection being reduced
 * @template R - reduced value
 * @public
 */
export type IReducerFn<T, R> = (
  /**
   * Accumulator: the "work in progress" reducer value
   */
  accumulator: R,
  /**
   * Collection item, changing on each iteration of the reducer loop
   */
  collectionItem: T,
  /**
   * Key that the collection item is placed under in the dictionary
   */
  key: string | number,
  /**
   * Dictionary being reduced over
   */
  from: Dict<T>,
) => R;

/**
 * Transformer function
 *
 * @param T - item type, of the collection being mapped over
 * @param S - transformed collection item type
 *
 * @public
 */
export type ITransformerFn<T, S> = (
  /**
   * {@inheritdoc | IREducerFn#collectionItem}
   */
  collectionItem: T,
  /**
   * {@inheritdoc | IREducerFn#key}
   */
  key: string | number,
  /**
   * {@inheritdoc | IREducerFn#from}
   */
  from: Dict<T>,
) => S;

/**
 * Iterate over a dictionary to incrementally create
 * a single value
 *
 * @param from - dictionary to iterate over
 * @param reducer - reducer function
 * @param initialVal - initial value that the accumulator starts with
 * @param acc - initial value that the accumulator starts with
 * @public
 */
export function dictReduce<T, R>(
  from: Dict<T>,
  reducer: IReducerFn<T, R>,
  initialVal: R,
): R {
  let acc = initialVal;
  const ks = keys(from);
  ks.forEach((key, i) => {
    const val: T | undefined = from[key];
    // undefined values are skipped
    if (typeof val !== 'undefined') {
      acc = reducer(acc, val, key, from);
    }
  });
  return acc;
}

/**
 * @public
 */
export function dictMap<T, S>(
  from: Dict<T>,
  transform: (val: T, key: string | number, from: Dict<T>) => S,
): Dict<S> {
  return dictReduce(
    from,
    (dest, val, key, src) => {
      dest[key] = transform(val, key, src);
      return dest;
    },
    {} as Dict<S>,
  );
}
/**
 * @public
 */
export function dictFilter<T, S extends T>(
  from: Dict<T>,
  filter: (val: T, key: string | number, from: Dict<T>) => val is S,
): Dict<S>;

/**
 * @public
 */
export function dictFilter<T>(
  from: Dict<T>,
  filter: (val: T, key: string | number, from: Dict<T>) => unknown,
): Dict<T>;
export function dictFilter<T, S extends T>(
  from: Dict<T>,
  filter: (val: T, key: string | number, from: Dict<T>) => unknown,
): Dict<S> {
  return dictReduce(
    from,
    (dest, val, key, src) => {
      if (filter(val, key, src)) {
        dest[key] = (val as any) as S;
      }
      return dest;
    },
    {} as Dict<S>,
  );
}

/**
 * @public
 */
export function dictForEach<T, S>(
  from: Dict<T>,
  callback: (val: T, key: string | number, from: Dict<T>) => void,
): void {
  keys(from).forEach((k, idx) => {
    const val: T | undefined = from[k];
    if (typeof val !== 'undefined') {
      callback(val, k, from);
    }
  });
}
