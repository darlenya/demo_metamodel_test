'use strict';

import assert from 'assert';

import { Entitlement } from '../../lib/tests/Entitlement';
import { Application } from '../../lib/tests/Application';



describe('JList Tests', () => {
  it("Set Parent", () => {
    // create two different Application objects
		const a1 = new Application();
    const e1 = new Entitlement();

    // add the entitlement to an application
    a1.entitlements.add(e1);
    assert.equal( e1._getParent(), a1, "Invalid or NO parent" );
  });

  it("Move to new Parent", () => {
    // create two different Application objects
		const a1 = new Application();
    a1.name = 'App1';

		const a2 = new Application();
    a2.name = 'App2';

    const e1 = new Entitlement();
    e1.name = 'Ent 1';
    const e2 = new Entitlement();
    e2.name = 'Ent 2';
    const e3 = new Entitlement();
    e3.name = 'Ent 3';

    // add the entitlement to an application
    a1.entitlements.add(e1);
    a1.entitlements.add(e2);
    a1.entitlements.add(e3);
    assert.equal( e1._getParent(), a1, "Invalid or NO parent" );
    assert.equal( e2._getParent(), a1, "Invalid or NO parent" );
    assert.equal( e3._getParent(), a1, "Invalid or NO parent" );

    // check the amount of stored entitlements
    console.log("######### jetzt");
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

});
