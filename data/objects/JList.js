'use strict';

/**
 * Stores all the obejcts by there ID
 */
const _objectRegistry = {};

/**
 * This is the unique id
 */
let _id = 1000;

export class JClass {

	constructor(opts) {
		if(opts === undefined){
			opts = {}
		}

		this.unique = true;
		this.upper_bound = -1;

		if(opts.unique != undefined){
			this.unique = opts.unique;
		}

		if(opts.upper_bound != undefined){
				this.upper_bound = opts.upper_bound;
		}

		this.clear();
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
		if(opts.upper_bound === 1){
			this.data = element;
		}else{
			if(this.unique){
				this.data.add(element);
			}else{
				this.data.push(element);
			}
		}
	}

	/**
	 * Removes the given element from the list if it exists.
	 * If the list is not unique it will remove the last one.
	 * @param {object} element - The element to be removed
	 */
	remove(element){
		if(opts.upper_bound === 1){
			// it will only store one element
			if(this.data !== undefined){
				if(this.data === element){
					this.data = undefined;
				}
			}
		}else{
			if(this.unique){
				this.data.delete(element);
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
				callback(this.data, 0, [this.data]);
			}
		}else{
			this.data.forEach(callback);
		}
	}

	/**
	 * clears the list of stored elements
	 */
	clear(){
		if(opts.upper_bound === 1){
			// it will only store one element
			this.data = undefined;
		}else{
			if(this.unique){
				this.data = new Map();
			}else{
				this.data = [];
			}
		}
	}

}
