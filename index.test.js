import test from 'ava';
import generateHashIds from './index.js';

test('generateHashIds is defined and works', t => {
  const result = generateHashIds([1, 2], '3');
  t.truthy(result);
});
