import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS, SITE } from '../data/siteContent';
import {
  filterProjects,
  getRelatedProjects,
  stepSpotlight,
  validateContactForm,
} from './portfolioLogic';

test('filterProjects slices initialCount when showAll is false and returns all when true', () => {
  const allCollapsed = filterProjects(PROJECTS, 'All', false, 4);
  assert.equal(allCollapsed.filtered.length, 6);
  assert.equal(allCollapsed.visible.length, 4);
  assert.equal(allCollapsed.hasMore, true);

  const allExpanded = filterProjects(PROJECTS, 'All', true, 4);
  assert.equal(allExpanded.visible.length, 6);

  const openSource = filterProjects(PROJECTS, 'Open Source', false, 4);
  assert.equal(openSource.filtered.length, 1);
  assert.equal(openSource.visible.length, 1);
  assert.equal(openSource.hasMore, false);
  assert.equal(openSource.visible[0].slug, 'campus-assignment-export');
});

test('getRelatedProjects returns up to 2 distinct next projects wrapping around', () => {
  const fromFirst = getRelatedProjects(PROJECTS, 'coderecall', 2);
  assert.deepEqual(
    fromFirst.map((p) => p.slug),
    ['amar-mart', 'lostify']
  );

  const fromLast = getRelatedProjects(PROJECTS, 'poojaone', 2);
  assert.deepEqual(
    fromLast.map((p) => p.slug),
    ['coderecall', 'amar-mart']
  );
});

test('validateContactForm enforces name, email, topic, and message length', () => {
  const invalid = validateContactForm(
    { name: '   ', email: 'bad-email', topic: '', message: 'short' },
    SITE.contact.form.topics
  );
  assert.equal(invalid.name, 'Please enter your name.');
  assert.equal(invalid.email, 'Please enter a valid email.');
  assert.equal(invalid.topic, "Please choose what it's about.");
  assert.equal(invalid.message, 'Message must be at least 10 characters.');

  const valid = validateContactForm(
    {
      name: 'Ada Lovelace',
      email: 'ada@analytical.org',
      topic: 'Collaboration',
      message: 'Let us collaborate on a computational engine project.',
    },
    SITE.contact.form.topics
  );
  assert.deepEqual(valid, {});
});

test('stepSpotlight interpolates smoothly and snaps on reduced motion', () => {
  const initial = { x: 0, y: 0, tx: 100, ty: 200, s: 0, ts: 1 };
  const stepped = stepSpotlight(initial, 30, false);
  assert.equal(stepped.next.x, 15);
  assert.equal(stepped.next.y, 30);
  assert.ok(stepped.next.s > 0 && stepped.next.s < 1);
  assert.equal(stepped.done, false);

  const reduced = stepSpotlight(initial, 30, true);
  assert.equal(reduced.next.x, 100);
  assert.equal(reduced.next.y, 200);
  assert.equal(reduced.smoothScale, 1);
  assert.equal(reduced.done, true);
});
