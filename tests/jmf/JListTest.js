'use strict';

import assert from 'assert';

import { Entitlement } from '../../lib/tests/Entitlement';
import { Application } from '../../lib/tests/Application';
import { JModel } from '../../lib/jmf/JModel';



describe('JList Tests', () => {
  it("Set Parent", () => {
    const model = new JModel();
    // create two different Application objects
		const a1 = new Application({'model':model});
    const e1 = new Entitlement({'model':model});

    // add the entitlement to an application
    a1.entitlements.add(e1);
    assert.equal( e1._getParent(), a1, "Invalid or NO parent" );
  });

  it("Move to new Parent", () => {
    const model = new JModel();
    // create two different Application objects
		const a1 = new Application({'model':model});
    a1.name = 'App1';

		const a2 = new Application({'model':model});
    a2.name = 'App2';

    const e1 = new Entitlement({'model':model});
    e1.name = 'Ent 1';
    const e2 = new Entitlement({'model':model});
    e2.name = 'Ent 2';
    const e3 = new Entitlement({'model':model});
    e3.name = 'Ent 3';

    model.registerObject(a1);
    model.registerObject(a2);
    model.registerObject(e1);
    model.registerObject(e2);
    model.registerObject(e3);

    // add the entitlement to an application
    a1.entitlements.add(e1);
    a1.entitlements.add(e2);
    a1.entitlements.add(e3);
    assert.equal( e1._getParent(), a1, "Invalid or NO parent" );
    assert.equal( e2._getParent(), a1, "Invalid or NO parent" );
    assert.equal( e3._getParent(), a1, "Invalid or NO parent" );

    // check the amount of stored entitlements
    assert.equal(a1.entitlements.size(), 3 );

    a2.entitlements.add(e2);
    assert.equal( e2._getParent(), a2, "Invalid or NO parent" );

    // e2 should be reoved from app1
    assert.equal(a1.entitlements.size(), 2, "Invalid entitlement count" );
    assert.equal(a2.entitlements.size(), 1, "Invalid entitlement count" );

    assert.equal( e1._getParent(), a1, "Invalid or NO parent" );
    assert.equal( e2._getParent(), a2, "Invalid or NO parent" );
    assert.equal( e3._getParent(), a1, "Invalid or NO parent" );
  });

  it("ForEach test", () => {
    const model = new JModel();
    // create two different Application objects
    const a1 = new Application({'model':model});

    const e1 = new Entitlement({'model':model});
    e1.name = 'Ent 1';
    const e2 = new Entitlement({'model':model});
    e2.name = 'Ent 2';
    const e3 = new Entitlement({'model':model});
    e3.name = 'Ent 3';

    model.registerObject(a1);
    model.registerObject(e1);
    model.registerObject(e2);
    model.registerObject(e3);


    const ents = [e1,e2,e3];

    // add the entitlement to an application
    a1.entitlements.add(e1);
    a1.entitlements.add(e2);
    a1.entitlements.add(e3);

    let counter =  0;

    a1.entitlements.forEach((val)=>{
      const ent = ents[counter];
      counter++;
      assert.equal( ent.name, "Ent "+counter, "For Each does not work" );
    });

    assert.equal( counter, 3, "For Each does not work" );
  });


});
