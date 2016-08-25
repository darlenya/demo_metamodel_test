'use strict';

import { JClass } from './JClass';

/**
 * The JModel is a registry for all the created objects.
 * It also works as the factory for creating the objects
 */

export class JModel {
	constructor(opts) {
		if(opts === undefined){
			opts = {};
		}

		// The name of this model
		this.name = 'undefined model';
		if(opts.name){this.name = opts.name;}

		// stores the classes by there name
		this._class_registry = {};

		// stores all the created objects by there id
		this._object_registry = {};

		// initial value
		this._sequence = 1000;
	}

	/**
	 * Creates a new sequence number
	 * @returns {number} A new sequence number
	 */
	get sequence(){
		return this._sequence++;
	}

	/**
	 * Set a new sequence value. But only change the current sequence if the given
	 * value is greater than the current value
	 * @param {number} newValue - The new sequence value
	 */
	set sequence(newValue){
		if(newValue > this._sequence){
			this._sequence = newValue;
			this._sequence++;
		}
	}

	/**
	 * Registers a new class. So it could be created by this factory
	 * @param {object} clazz - The class to be registered
	 * @param {string} className - (Optional) The name under the class should
	 *                             be registered. If not given the real classname is used
	 */
	registerClass(clazz, className){
		if(typeof clazz !== 'object'){
			throw new Error(`The given class ist not an object`);
		}

		if(! clazz instanceof JClass){
			throw new Error(`Only classes which are an instance of 'JClass' could be registered`);
		}

		// ok, register the class
		if(className === undefined){
			className = clazz.constructor.name;
		}
		this._class_registry[className] = clazz;
	}

	/**
	 * Registers an object in this model
	 * @param {object} element - The object to be registered
	 */
	registerObject(element){
		let id = element.id;
		if(id === undefined){
			id = this.sequence;
			element.id = id;
		}

		// maybe the sequence must be set to a new value
		this.sequence = id;

		this._object_registry[id] = element;
	}

	/**
	 * Returns the object with the given ID. If the object does not exists
	 * an error will be thrown
	 * @param {number} id - The id of the object to be returned
	 */
	getObjectForId(id){
		if(typeof id !== 'number'){
			throw new Error(`The given ID must be of type 'number'`);
		}

		if(this._object_registry[id]=== undefined){
			throw new Error(`The object with the id '${id}' does not exists in the model ${this.name}`);
		}

		return this._object_registry[id];
	}

	/**
	 * Creates a new object of the given class type
	 * @param {string} className -  The name of the class, the object should be created from
	 * @param {object} attributes -  (Optional) The attributes to set for this object
	 * @returns {object} The created object
	 */
	createClass(className, attributes){
		const clazz = this._class_registry[className];

		if(clazz === undefined){
			throw new Error(`Under the name '${className}' is no class registered`);
		}

		const newObject = new clazz();
		if(attributes){
			newObject.setAllAttributes(attributes);
		}
	}

}
