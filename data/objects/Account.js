'use strict';

import { JClass } from './JClass';
//import { Entitlement } from './Entitlement';


export class Account extends JClass{
	constructor(opts) {
		super(opts);

		// Stores the meta infomation for each property
		this._property_types = {
			'app_id'        : 'string',
			'name'          : 'string',
			'description'   : 'string',
			'creation_date' : 'date'
		};

		// stores the metainformation for the reference types
		this._reference_type = {
			'entitlements' : {
				'containment' : true,
				'unique'      : true,
				'upper_bound' : -1,
				'type'        : 'Entitlement'
			}
		};

		this.entitlements = new Set();
	}

	addEntitlement(entitlement){
		if(typeof entitlement === 'object'){
			if(entitlement instanceof Entitlement){
				this.entitlement.add(entitlement._id);
			}else{
				throw new Error (`The given object is not of type 'Entitlement'`);
			}
		}else if(typeof entitlement === 'number'){
			this.entitlement.add(entitlement);
		}else{
			throw new Error (`The given value is neither an object nor a number`);
		}
	}


}
