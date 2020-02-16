import { Dict } from '@mike-north/types';
import { dictFilter } from '../src';

QUnit.module('filter tests', hooks => {
  QUnit.test('positive test case', assert => {
    assert.deepEqual(
      dictFilter(
        {
          a: [1, 2],
          b: [4, 5, 6],
        } as Dict<number[]>,
        nums => nums.length === 3,
      ),
      { b: [4, 5, 6] },
    );
  });
  QUnit.test('empty case', assert => {
    assert.deepEqual(
      dictFilter({} as Dict<number[]>, nums => nums.reduce((s, x) => s + x, 0)),
      {},
    );
  });
  QUnit.test('skipping undefined', assert => {
    assert.deepEqual(
      dictFilter({ d: undefined } as Dict<number[]>, nums =>
        nums.reduce((s, x) => s + x, 0),
      ),
      {},
    );
  });
});
