'use strict';

import assert from 'assert';

import {Account} from '../../../lib/objects/Account';



describe('Sequence test', () => {
  it("Get a sequence from different obejcts", () => {

		console.log("YES, it runs");
		console.log(Account);

		const a1 = new Account();
		const a2 = new Account();

		console.log(Account._getNewId());
		console.log(Account._getNewId());
		console.log(Account._getNewId());
		console.log(a2.constructor.name);

    assert.equal(
      a1._getNewId()+1,
      a2._getNewId(),
      "Not the same case"
    );
  });
});
