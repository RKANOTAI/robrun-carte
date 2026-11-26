const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = {};
vm.runInNewContext(fs.readFileSync(path.join(root, 'looty-bay/cargo-data.js'), 'utf8'), context);
const cargo = JSON.parse(JSON.stringify(context.CARGO_DATA));
const html = fs.readFileSync(path.join(root, 'looty-bay/index.html'), 'utf8');
const original = JSON.parse(html.match(/^const D = (.*);$/m)[1]);
const random = cargo.buildings.flatMap(b => b.random);
const fixed = cargo.buildings.flatMap(b => b.fixed);
const all = [...random, ...fixed];

test('every cargo entity has one building, a valid place and finite coordinates', () => {
  assert.equal(random.length, 170);
  assert.equal(fixed.length, 8);
  assert.equal(cargo.buildings.length, 28);
  assert.deepEqual(all.map(p => p[0]).sort((a,b) => a-b), Array.from({length:178}, (_,i) => i+481));
  const slugs = new Set(original.places.map(p => p[0]));
  assert.equal(new Set(cargo.buildings.map(b => b.slug)).size, 28);
  assert.equal(new Set(cargo.buildings.map(b => b.buildingId)).size, 28);
  for (const b of cargo.buildings) assert.ok(slugs.has(b.slug), b.slug);
  for (const p of all) for (const v of p.slice(1,4)) assert.ok(Number.isFinite(v));
});

test('random placements have no invented item associations', () => {
  for (const p of random) assert.equal(p.length, 4);
  assert.equal(cargo.items.length, 8);
  assert.equal(cargo.items.filter(i => i.id.startsWith('bush_')).length, 6);
  assert.equal(cargo.items.filter(i => i.id.startsWith('reagents_')).length, 2);
  for (const i of cargo.items) {
    assert.equal(i.place, undefined);
    assert.equal(i.probability, undefined);
    for (const rel of Object.values(original.rel)) {
      for (const entries of Object.values(rel)) assert.ok(!entries.some(e => e[0] === i.id));
    }
  }
});

test('fixed cargo types agree with the existing quantities without duplicating them', () => {
  const police = cargo.buildings.find(b => b.slug === 'police-station');
  const bank = cargo.buildings.find(b => b.slug === 'looty-bay-bank');
  assert.equal(police.fixed.length, 3);
  assert.equal(bank.fixed.length, 5);
  assert.ok(police.fixed.every(p => p[4] === 'weapon_box_1'));
  assert.ok(bank.fixed.every(p => p[4] === 'bank_cash_bag'));
  for (const b of [police, bank]) {
    const item = b.fixed[0][4];
    assert.equal(original.rel[b.slug].f.filter(e => e[0] === item).length, 1);
    assert.equal(original.rel[b.slug].f.find(e => e[0] === item)[1], b.fixed.length);
  }
  assert.equal(original.map.pins.filter(p => p[0] === 'cargo').length, 14);
});

test('projection keeps cargo on the background and near the associated building', () => {
  const byPlace = Object.fromEntries(original.places.map(p => [p[0],p]));
  for (const b of cargo.buildings) {
    const place = byPlace[b.slug];
    for (const p of [...b.random,...b.fixed]) {
      const x = p[1]*cargo.projection.xScale+cargo.projection.xOffset;
      const y = p[3]*cargo.projection.zScale+cargo.projection.zOffset;
      assert.ok(x >= 0 && x <= 100 && y >= 0 && y <= 100);
      assert.ok(Math.hypot(x-place[6],y-place[7]) < 8, `${b.slug}: misplaced entity ${p[0]}`);
    }
  }
});

test('CSV export covers the same entities, types and coordinates as the map', () => {
  const rows = fs.readFileSync(path.join(root,'looty-bay/cargo-locations.csv'),'utf8').trim().split(/\r?\n/).slice(1).map(l => l.split(';'));
  assert.equal(rows.length,178);
  assert.equal(new Set(rows.map(r => r[3])).size,178);
  for (const r of rows) {
    const b = cargo.buildings.find(b => b.slug === r[0]);
    const point = b[r[2]].find(p => p[0] === Number(r[3]));
    assert.ok(point);
    assert.equal(r[4],point[4] || '');
    assert.deepEqual(r.slice(5).map(Number),point.slice(1,4));
  }
});

test('plant and reagent variants have local game artwork', () => {
  for (const item of cargo.items) {
    const name = item.id.startsWith('bush_') ? item.id.replace(/_\d+$/,'') : item.id;
    const image = fs.readFileSync(path.join(root,'looty-bay/assets/cargo',name+'.png'));
    assert.equal(image.subarray(1,4).toString(),'PNG');
  }
  for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
});
