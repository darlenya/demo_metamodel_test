'use strict';

import assert from 'assert';

import { JModel } from '../../lib/jmf/JModel';
import { Entitlement } from '../../lib/tests/Entitlement';



describe('Model constructor Tests', () => {
  it("Create Model", () => {
		const m1 = new JModel();
    assert.equal( m1.name, 'undefined model', 'Model with out a given name should have the undefined name');
  });

  it("Create Model with name", () => {
    const m1 = new JModel({'name' : 'my model'});
    assert.equal( m1.name, 'my model');
  });
});



describe('Model Sequence Tests', () => {
  it("Sequence test", () => {
    const m1 = new JModel({'name' : 'my model'});
    assert.equal( m1.name, 'my model');

    const val = m1.sequence;
    const val2 = m1.sequence;

    assert.equal( val+1, val2);
  });

  it("Sequence test set value less than current", () => {
    const m1 = new JModel({'name' : 'my model'});
    assert.equal( m1.name, 'my model');

    const val = m1.sequence;
    m1.sequence = 150;
    const val2 = m1.sequence;

    assert.equal( val+1, val2);
  });

  it("Sequence test set value greater than current", () => {
    const m1 = new JModel({'name' : 'my model'});
    assert.equal( m1.name, 'my model');

    const val = m1.sequence;
    m1.sequence = val + 10;
    const val2 = m1.sequence;

    assert.equal( val+11, val2);
  });
});


describe('Model Registry Tests', () => {
  it("Add object to registry with id", () => {
    const m1 = new JModel({'name' : 'my model'});
    const e1 = new Entitlement({'model' : m1, 'id' : 145});
    assert.equal( e1.id, 145);

    m1.registerObject(e1);
    const e1Copy = m1.getObjectForId(145);
    assert.equal( e1Copy, e1);
  });

  it("Add object to registry without id", () => {
    const m1 = new JModel({'name' : 'my model'});
    const e1 = new Entitlement({'model' : m1});

    m1.registerObject(e1);
    const e1Copy = m1.getObjectForId(e1.id);
    assert.equal( e1Copy, e1);
  });

});
