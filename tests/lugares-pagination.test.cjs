const { test } = require('node:test');
const assert = require('node:assert/strict');
const { paginasVisibles } = require('../lib/lugares-ui.ts');

test('pagination keeps all small sets and bounded navigation for large sets', () => {
  assert.deepEqual(paginasVisibles(1, 1), [1]);
  assert.deepEqual(paginasVisibles(3, 5), [1, 2, 3, 4, 5]);
  for (let total = 1; total <= 60; total++) {
    for (let actual = 1; actual <= total; actual++) {
      const items = paginasVisibles(actual, total);
      const pages = items.filter(x => typeof x === 'number');
      assert.ok(pages.includes(1) && pages.includes(total) && pages.includes(actual));
      if (actual > 1) assert.ok(pages.includes(actual - 1));
      if (actual < total) assert.ok(pages.includes(actual + 1));
      assert.ok(pages.length <= 7);
      assert.equal(new Set(pages).size, pages.length);
      assert.deepEqual([...pages].sort((a,b) => a-b), pages);
      assert.ok(pages.every(p => p >= 1 && p <= total));
      items.forEach((item, i) => {
        if (item === '…') {
          assert.equal(typeof items[i-1], 'number');
          assert.equal(typeof items[i+1], 'number');
          assert.ok(items[i+1] - items[i-1] > 2);
        }
      });
    }
  }
});
