'use strict';

import assert from 'assert';

import { Entitlement } from '../../lib/tests/Entitlement';
import { Application } from '../../lib/tests/Application';
import { JModel } from '../../lib/jmf/JModel';



describe('Common Class Tests', () => {

  it("Set all attributes", () => {
    const model = new JModel();
		const a1 = new Application({'model':model});
    const values = {
      'app_id'        : 'Hugo 01',
      'name'          : 'Best Application',
      'description'   : 'What should I say?',
      'unknown'       : 'Do not store this'
    };

    const idBefore = a1.id;
    a1.setAllAttributes(values);

    assert.equal( a1.app_id, 'Hugo 01', "Attribute not stored corectly" );
    assert.equal( a1.name, 'Best Application', "Attribute not stored corectly" );
    assert.equal( a1.description, 'What should I say?', "Attribute not stored corectly" );
    assert.equal( a1.unknown, undefined, "Attribute not stored corectly" );
    assert.equal( a1.id, idBefore, "The ID must not change" );
  });

  it("Set all attributes with ID. ID lower than current sequence", () => {
    const model = new JModel();
		const a1 = new Application({'model':model});
    const values = {
      'app_id'        : 'Hugo 01',
      'name'          : 'Best Application',
      'description'   : 'What should I say?',
      '_id'           : '150',
      'unknown'       : 'Do not store this'
    };

    const idBefore = a1.id;
    a1.setAllAttributes(values);

    assert.equal( a1.app_id, 'Hugo 01', "Attribute not stored corectly" );
    assert.equal( a1.name, 'Best Application', "Attribute not stored corectly" );
    assert.equal( a1.description, 'What should I say?', "Attribute not stored corectly" );
    assert.equal( a1.unknown, undefined, "Attribute not stored corectly" );
    assert.equal( a1.id, idBefore, "The ID must not change" );
  });


});
