'use strict';

import assert from 'assert';

import { Entitlement } from '../../lib/tests/Entitlement';
import { Application } from '../../lib/tests/Application';



describe('Common Class Tests', () => {
  it("Sequence test", () => {

    // create two different Application objects
		const a1 = new Application();
		const a2 = new Application();

    assert.equal(
      a1._getNewId()+1,
      a2._getNewId(),
      "Not the same case"
    );
  });

  it("Set all attributes", () => {
		const a1 = new Application();
    const values = {
      'app_id'        : 'Hugo 01',
      'name'          : 'Best Application',
      'description'   : 'What should I say?',
      'unknown'       : 'Do not store this'
    };

    const idBefore = a1.getInternalId();
    a1.setAllAttributes(values);

    assert.equal( a1.app_id, 'Hugo 01', "Attribute not stored corectly" );
    assert.equal( a1.name, 'Best Application', "Attribute not stored corectly" );
    assert.equal( a1.description, 'What should I say?', "Attribute not stored corectly" );
    assert.equal( a1.unknown, undefined, "Attribute not stored corectly" );
    assert.equal( a1.getInternalId(), idBefore, "The ID must not change" );
  });

  it("Set all attributes with ID. ID lower than current sequence", () => {
		const a1 = new Application();
    const values = {
      'app_id'        : 'Hugo 01',
      'name'          : 'Best Application',
      'description'   : 'What should I say?',
      '_id'           : '150',
      'unknown'       : 'Do not store this'
    };

    a1.setAllAttributes(values);

    assert.equal( a1.app_id, 'Hugo 01', "Attribute not stored corectly" );
    assert.equal( a1.name, 'Best Application', "Attribute not stored corectly" );
    assert.equal( a1.description, 'What should I say?', "Attribute not stored corectly" );
    assert.equal( a1.unknown, undefined, "Attribute not stored corectly" );
    assert.equal( a1.getInternalId(), 150, "The ID ist not as expected" );
  });

  it("Set all attributes with ID. ID greater than current sequence", () => {
		const a1 = new Application();
    const idBefore = a1.getInternalId();
    const newId = idBefore+10;

    const values = {
      'app_id'        : 'Hugo 01',
      'name'          : 'Best Application',
      'description'   : 'What should I say?',
      '_id'           : newId,
      'unknown'       : 'Do not store this'
    };

    a1.setAllAttributes(values);

    assert.equal( a1.app_id, 'Hugo 01', "Attribute not stored corectly" );
    assert.equal( a1.name, 'Best Application', "Attribute not stored corectly" );
    assert.equal( a1.description, 'What should I say?', "Attribute not stored corectly" );
    assert.equal( a1.unknown, undefined, "Attribute not stored corectly" );
    assert.equal( a1.getInternalId(), newId, `The ID ist not as expected: Initial id = ${idBefore}. New Id = ${newId}` );

    // test that the next id comes from an increased sequence
    const a2 = new Application();
    assert.equal( a2.getInternalId(), newId+1,  `The ID ist not as expected: Initial id = ${idBefore}. New Id = ${newId}. Next expected id = ${newId+1}`);
  });

  it("Check object is registered", () => {
		const a1 = new Application();
    a1.app_id = "A1";
    const a1_id = a1.getInternalId();

    const a2 = new Application();
    a2.app_id = "A2";
    const a2_id = a2.getInternalId();

    const a3 = new Application();
    a3.app_id = "A3";
    const a3_id = a3.getInternalId();

    const a1_copy = a1._getObjectForId(a1_id);
    const a2_copy = a1._getObjectForId(a2_id);
    const a3_copy = a1._getObjectForId(a3_id);

    assert.equal( a1, a1_copy, "Not the expected object" );
    assert.equal( a1_copy.app_id, 'A1', "Not the expected app_id" );

    assert.equal( a2, a2_copy, "Not the expected object" );
    assert.equal( a2_copy.app_id, 'A2', "Not the expected app_id" );

    assert.equal( a3, a3_copy, "Not the expected object" );
    assert.equal( a3_copy.app_id, 'A3', "Not the expected app_id" );
  });


});
