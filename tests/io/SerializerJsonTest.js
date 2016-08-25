'use strict';

import assert from 'assert';

import { Entitlement } from '../../lib/tests/Entitlement';
import { Application } from '../../lib/tests/Application';
import { SerializerJson } from '../../lib/io/SerializerJson';

const creationDate = new Date('2016', '03', '15', '20', '15', '34');

describe('Serialize', () => {
  it("Single serialize", () => {

    const value1 = {
      'app_id'        : 'Hugo 01',
      'name'          : 'Best Application',
      'description'   : 'What should I say?',
      'creation_date' : creationDate
    };

    // create Application
		const a1 = new Application();
    a1.setAllAttributes(value1);

    const e1 = new Entitlement();
    e1.name = 'Ent 1';
    e1.description = "Best descrition for Ent 1"

    const e2 = new Entitlement();
    e2.name = 'Ent 2';
    e2.description = "Best descrition for Ent 2"

    a1.entitlements.add(e1);
    a1.entitlements.add(e2);

    const res = SerializerJson.serialize(a1,2);
    console.log(res);

    // assert.equal(
    //   a1._getNewId()+1,
    //   a2._getNewId(),
    //   "Not the same case"
    // );
  });

});
