'use strict';

import { JClass } from './JClass';
// import { Jlist } from './JList';

export class Entitlement extends JClass{
	constructor(opts) {
		super(opts);

		// Stores the meta infomation for each property
		this._property_types = {
			'name'          : 'string',
			'description'   : 'string'
		};

		// The ID for this entitlement per application
		this._name = undefined;

		// <no desc>
		this._description = undefined;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	get name(){
		return this._name;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	set name(name){
		return this._name = name;
	}


	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	get description(){
		return this._description;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	set description(description){
		return this._description = description;
	}

}
