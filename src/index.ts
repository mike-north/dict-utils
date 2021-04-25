import { Dict } from '@mike-north/types';
/**
 * Incrementally arrive at a singular value from a `Dict<T>`
 * using a reducer function
 * @param input - Dictionary to reduce
 * @param reducer - The reducer function
 * @param initialValue - The initial value of the accumulator
 * @returns
 *
 * @public
 */
export function reduceDict<T, U>(
  input: Dict<T>,
  reducer: (previousValue: U, currentValue: T, key: string, dict: Dict<T>) => U,
  initialValue: U
): U {
  let output = initialValue;
  for (const k in input) {
    const currentVal = input[k];
    if (typeof currentVal !== 'undefined') {
      output = reducer(output, currentVal, k, input);
    }
  }
  return output;
}

/**
 * Transform a dictionary by applying a value transformation function to each value
 *
 * @param input - Dictionary to transform
 * @param transform - Mapping function
 * @returns The transformed dictionary
 *
 * @public
 */
export function mapDict<T, U>(
  input: Dict<T>,
  transform: (value: T, key: string, dict: Dict<T>) => U
): Dict<U> {
  return reduceDict(
    input,
    (out, val, key, dict) => {
      out[key] = transform(val, key, dict);
      return out;
    },
    {} as Dict<U>
  );
}


/**
 * Filter a dictionary, using a predicate to be applied to each value
 *
 * @param input - Dictionary to filter
 * @param filter - Filter function
 *
 * @public
 */
export function filterDict<T, U extends T>(
  input: Dict<T>,
  filter: (value: T, key: string, dict: Dict<T>) => value is U
): Dict<U>;
/**
 * Filter a dictionary, using a predicate to be applied to each value
 *
 * @param input - Dictionary to filter
 * @param filter - Filter function
 *
 * @public
 */
export function filterDict<T>(
  input: Dict<T>,
  filter: (value: T, key: string, dict: Dict<T>) => boolean
): Dict<T>;
export function filterDict<T>(
  input: Dict<T>,
  filter: (value: T, key: string, dict: Dict<T>) => boolean
): Dict<T> {
  return reduceDict(
    input,
    (out, val, key, dict) => {
      if (filter(val, key, dict)) {
        out[key] = val;
      }
      return out;
    },
    {} as Dict<T>
  );
}

/**
 * Iterate over a dictionary, invoking a callback for each
 * non-undefined value
 *
 * @param input - Dictionary to iterate over
 * @param callback - Callback to invoke for each value
 *
 * @public
 */
export function forEachDict<T>(
  input: Dict<T>,
  callback: (value: T, key: string, dict: Dict<T>) => void
): void {
  for (const k in input) {
    const currentVal = input[k];
    if (currentVal) {
      callback(currentVal, k, input);
    }
  }
}
