import assert from 'node:assert/strict';
import {test} from 'node:test';
import {PreviewQueue} from '../src/previewQueue.js';

test('continuous slider edits show completed builds and only queue the latest exact value', () => {
  const queue = new PreviewQueue<number>(() => true);
  queue.submit(1);
  const first = queue.take()!;
  assert.equal(first.project, 1);
  for (const value of [2, 3, 4.123456]) {
    queue.submit(value);
    assert.equal(queue.take(), null);
  }
  const intermediate = queue.complete(first.revision)!;
  assert.equal(intermediate.visible, true);
  assert.equal(intermediate.current, false);
  assert.equal(intermediate.next, true);
  const last = queue.take()!;
  assert.equal(last.project, 4.123456);
  assert.equal(queue.complete(first.revision), null);
  assert.equal(queue.flight, last);
  assert.deepEqual(queue.complete(last.revision), {job: last, visible: true, current: true, next: false});
});

test('switching to a simple preview suppresses old mesh and does not enqueue a build', () => {
  const queue = new PreviewQueue<number>(value => value > 0);
  queue.submit(1);
  const job = queue.take()!;
  queue.submit(0);
  assert.equal(queue.complete(job.revision)?.visible, false);
  assert.equal(queue.take(), null);
  queue.submit(2);
  assert.equal(queue.take()?.project, 2);
});

test('failed builds can be completed and replaced without losing the latest edit', () => {
  const queue = new PreviewQueue<number>(() => true);
  queue.submit(1);
  const job = queue.take()!;
  queue.submit(2);
  assert.equal(queue.complete(job.revision)?.next, true);
  const replacement = queue.take()!;
  assert.equal(replacement.project, 2);
  assert.equal(queue.complete(replacement.revision)?.current, true);
  queue.submit(3);
  assert.equal(queue.take()?.project, 3);
});
