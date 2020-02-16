import { Dict } from '@mike-north/types';
import { dictMap } from '../src';

QUnit.module('map tests', hooks => {
  QUnit.test('summation', assert => {
    assert.deepEqual(
      dictMap(
        {
          a: [1, 2, 3],
          b: [4, 5, 6],
        } as Dict<number[]>,
        nums => nums.reduce((s, x) => s + x, 0),
      ),
      { a: 6, b: 15 },
    );
  });
  QUnit.test('empty case', assert => {
    assert.deepEqual(
      dictMap({} as Dict<number[]>, nums => nums.reduce((s, x) => s + x, 0)),
      {},
    );
  });
  QUnit.test('skipping undefined', assert => {
    assert.deepEqual(
      dictMap({ d: undefined } as Dict<number[]>, nums =>
        nums.reduce((s, x) => s + x + 1, 0),
      ),
      {},
    );
  });
});
