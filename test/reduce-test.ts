import { Dict } from '@mike-north/types';
import { dictReduce } from '../src';

QUnit.module('reduce tests', hooks => {
  QUnit.test('positive test case', assert => {
    assert.deepEqual(
      dictReduce(
        {
          a: [1, 2],
          b: [4, 5, 6],
        } as Dict<number[]>,
        (sum, nums) => sum + nums.reduce((s, x) => s + x, 0),
        0,
      ),
      18,
    );
  });
  QUnit.test('empty case', assert => {
    assert.deepEqual(
      dictReduce(
        {} as Dict<number[]>,
        x => {
          return x + 1;
        },
        3,
      ),
      3,
    );
  });
  QUnit.test('undefined case', assert => {
    assert.deepEqual(
      dictReduce(
        { d: undefined } as Dict<number[]>,
        x => {
          return x + 1;
        },
        3,
      ),
      3,
    );
  });
});
