'use strict';

import assert from 'assert';

import { Entitlement } from '../../lib/tests/Entitlement';
import { Application } from '../../lib/tests/Application';
import { SerializerJson } from '../../lib/io/SerializerJson';
import { JModel } from '../../lib/jmf/JModel';

const creationDate = new Date('2016', '03', '15', '20', '15', '34');

describe('Serialize', () => {

  const m = new JModel();
  m.registerClass(Entitlement);
  m.registerClass(Application);

  const values = {
    'app_id'        : 'Hugo 01',
    'name'          : 'Best Application',
    'description'   : 'What should I say?',
    'unknown'       : 'Do not store this'
  };

  const values2 = {
    'app_id'        : 'Hugo 02',
    'name'          : 'Best Application',
    'description'   : 'What should I say?',
    'unknown'       : 'Do not store this'
  };

  const a1 = m.createObject('Application', values);
  const a2 = m.createObject('Application', values);
  const a3 = m.createObject('Application', values2);
  const a4 = m.createObject('Application', values);
  const a5 = m.createObject('Application', values);
  const a6 = m.createObject('Application', values);

  const e1 = m.createObject('Entitlement', {'name' : 'Ent 1', 'description' : 'Desc 1'});
  const e2 = m.createObject('Entitlement', {'name' : 'Ent 2', 'description' : 'Desc 2'});
  const e3 = m.createObject('Entitlement', {'name' : 'Ent 3', 'description' : 'Desc 3'});

  const e1_a = m.createObject('Entitlement', {'name' : 'Ent 1', 'description' : 'Desc 1'});
  const e2_a = m.createObject('Entitlement', {'name' : 'Ent 2', 'description' : 'Desc 2'});

  a1.entitlements.add(e1);
  a1.entitlements.add(e2);
  a1.entitlements.add(e3);

  a2.entitlements.add(e1);
  a2.entitlements.add(e2);
  a2.entitlements.add(e3);

  a3.entitlements.add(e1);
  a3.entitlements.add(e2);
  a3.entitlements.add(e3);

  a4.entitlements.add(e1);
  a4.entitlements.add(e2);
  a4.entitlements.add(e3);
  a4.otherList.add(e1);
  a4.otherList.add(e2);
  a4.otherList.add(e3);

  a5.entitlements.add(e1);
  a5.entitlements.add(e3); // other order
  a5.entitlements.add(e2);


  it("Single serialize", () => {
    const m2 = new JModel();
    m2.registerClass(Entitlement);
    m2.registerClass(Application);

    // Serialize the first model
    const res = SerializerJson.serialize(m, 2);

    // deserialize the result
    SerializerJson.deserialize(m2,res);

    // Now serialze again
    const res2 = SerializerJson.serialize(m2, 2);

    assert.equal( res, res2 );
  });

});
