'use strict';

import {EventEmitter} from 'events';

/**
 * This class implements a list which could be parametrized. The list is a single value, an array or a set
 * depending on the parameter. Also it uses callbacks to notify about changes.
 * Internally the list will not store the object itself, it stores only the ID of the object.
 *
 * The following object describes the possible parameter and its default values
 * {
 *  property_name : <The name of this property>
 *	unique        : true
 *  upper_bound   : -1
 *  containment   : false
 * }
 *
 * property_name     - (mandatory) The name of the property this list is used for.
 * unique            - If true, an element could only be stored once.
 * upper_bound       - '-1,0' means that there is no limit
 *                     '1' means that only one value coul be stored. In this case it is more or less just an attribute
 *                     'n' defines how many elemenst the list can store
 * containment       - A true value means that the referenced element only exists in this reference. If it is deleted from
 *                     here, the element itself must be deleted
 * registry_function - The function to get the ID for an object
 * type              - The class of the elements, which could stored in this list
 *
 *
 * This class is an event emitter and emits the following events:
 * didAdd
 *	property_name	- The name of the reference
 *	element       - The element added
 * didRemove
 *	property_name	- The name of the reference
 *	element       - The element removed
 * didClear
 *	property_name	- The name of the reference
 *	elementArray  - An array of the removed alements
 * limitReached
 *                - Emit if the upper bound for this list will be execeeded by adding a new value
 *	property_name	- The name of the reference
 *	element       - The element which should have been added
 *  limit         - The limit which is reached
 */
export class JList {

	constructor(opts) {
		if(opts === undefined){
			throw new Error(`No configuration options given`);
		}

		if(opts.property_name === undefined){
			throw new Error(`No property_name option given`);
		}

		if(opts.registry_function === undefined){
			throw new Error(`No registry_function given`);
		}

		if(opts.type === undefined){
			throw new Error(`No type given`);
		}

		this.property_name = opts.property_name;
		this.registry_function = opts.registry_function;
		this.type = opts.type;
		this.unique = true;
		this.upper_bound = -1;
		this.containment = false;

		if(opts.unique !== undefined){
			this.unique = opts.unique;
		}

		if(opts.upper_bound !== undefined){
				this.upper_bound = opts.upper_bound;
		}

		if(opts.containment !== undefined){
				this.containment = opts.containment;
		}

		// creates the needed properties
		this.clear();
	}

	_emitAdd(element){
		this.emit('didAdd', this.property_name, element);
	}

	_emitRemove(element){
		this.emit('didRemove', this.property_name, element);
	}

	_emitClear(elements){
		this.emit('didClear', this.property_name, elements);
	}

	_emitLimitReached(element){
		this.emit('limitReached', this.property_name, elements, this.upper_bound);
	}


	/**
	 * If an element is added or removed some
	 */
	_handleAdd(element){
		if(this.containment){
			// need to set a new parent
		}else{
			// need to add it to the referenced items list
		}
	}

	/**
	 * Internal helper method. It will return the real object. If the if is given
	 * it will retrive the original object for the ID first. Then it will proof
	 * that the object is of the given type.
	 * @param {object} element - The element or element id to be prooved.
	 * @returns {object} The real object if it could be found
	 */
	_getElementForObject(element){
		if(element === undefined){
			throw new Error(`The given element is 'undefined'`);
		}

		// The given element is an id, check that it reference a valid object
		if(typeof element === 'number'){
			element = this.registry_function(element);
		}

		const expectedClass = this.type;
		// Check that the element if of the expected type
		if(expectedClass !== undefined && !(element instanceof expectedClass)){
			throw new Error(`The element '${element.constructor.name}' if not an instance of '${expectedClass.constructor.name}'`);
		}

		return element;
	}

	/**
	 * Returns a boolean value indicating if this list contains the given element or not
	 * @param {object} element - The element to be searched in the list
	 * @returns {boolean} True if the element exists in the list
	 */
	has(element){
		// check the given value and also proof the type.
		// Than make the element to an ID
		element = this._getElementForObject(element)._id;

		if(opts.upper_bound === 1){
			// it will only store one element
			if(this.data !== undefined){
				if(this.data === element){
					return true;
				}
			}
		}else{
			if(this.unique){
				return this.data.has(element);
			}else{
				const index = this.data.indexOf(element);
				if(index >= 0){
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Returns the ammount of stored elements
	 * @returns {number} The size of the stored elements
	 */
	size(){
		if(opts.upper_bound === 1){
			// it will only store one element
			if(this.data === undefined){
				return 0;
			}else{
				return 1;
			}
		}else{
			if(this.unique){
				this.data.size();
			}else{
				this.data.length;
			}
		}
	}

	/**
	 * Adds a new element
	 * @param {object} element - The element to be added
	 */
	add(element){
		// check the given value and also proof the type.
		// Than make the element to an ID
		element = this._getElementForObject(element)._id;

		if(opts.upper_bound === 1){
			if(this.data !== undefined){
				const oldElement = this.data;
				this.data = undefined;
				this._emitRemove(oldElement);
			}
			this.data = element;
			this._emitAdd(element);
		}else{
			if(this.unique){
				if(! this.data.has(element)){

					if(this.upper_bound === this.size()){
						// The limit is already reached, could not add a new element
						this._emitLimitReached(element);
					}else{
						this.data.add(element);
						this._emitAdd(element);
					}
				}
			}else{
				this.data.push(element);
				this._emitAdd(element);
			}
		}
	}

	/**
	 * Removes the given element from the list if it exists.
	 * If the list is not unique it will remove the last one.
	 * @param {object} element - The element to be removed
	 */
	remove(element){
		// check the given value and also proof the type.
		// Than make the element to an ID
		element = this._getElementForObject(element)._id;

		if(opts.upper_bound === 1){
			// it will only store one element
			if(this.data !== undefined){
				if(this.data === element){
					const oldElement = this.data;
					this.data = undefined;
					this._emitRemove(oldElement);
				}
			}
		}else{
			if(this.unique){
				if(this.data.has(element)){
					this.data.delete(element);
					this._emitRemove(oldElement);
				}
			}else{
				// first find the last element
				let index = -1;
				let lastIndex = this.data.indexOf(element);
				do{
					if(index > lastIndex){
						lastIndex = index;
					}
					index = this.data.indexOf(element, lastIndex);
				}while(index > lastIndex)

				// remove the last element
				this.data.splice(lastIndex, 0);
				this._emitRemove(oldElement);
			}
		}
	}

	/**
	 * The forEach() method executes a provided function once per each value in the Set object, in insertion order.
	 * @param {function} callback - Function to execute for each element.
	 */
	forEach(callback){
		if(opts.upper_bound === 1){
			// it will only store one element
			if(this.data !== undefined){
				const element = this.registry_function(this.data);
				callback(element, 0, [element]);
			}
		}else{
			const allELements =
hier weiter			

			this.data.forEach((id)=>{
				const element = this.registry_function(this.data);
			});
			this.data.forEach(callback);
		}
	}

	/**
	 * clears the list of stored elements
	 */
	clear(){
		if(opts.upper_bound === 1){
			// it will only store one element
			if(this.data !== undefined){
				const oldElement = this.data;
				this.data = undefined;
				this._emitClear([oldElement]);
			}
		}else{
			if(this.unique){
				if(this.data.size() > 0){
					const oldElements = [];
					this.data.forEach((val)=>{
						oldElements.push(val)
					});
				}
				this.data = new Map();
				this._emitClear(oldElements);
			}else{
				const oldElements = this.data;
				this.data = [];
				this._emitClear(oldElements);
			}
		}
	}

}
