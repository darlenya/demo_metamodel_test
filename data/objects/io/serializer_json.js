'use strict';

/**
 * Stores all the obejcts by there ID
 */
const _objectRegistry = {};

/**
 * This is the unique id
 */
let _id = 1000;

export class SerializerJson {

	constructor(opts) {}

	/**
	 * Serializes a JClass element
	 * @param {object} element - The element to be serialized
	 * @returns {string} The serialized JSON String
	 */
	static serialize(element) {
		// The element to be serialized
		const jsonElement = {};

		// copy the attributes
		Object.keys(element._property_types).forEach((keyName) => {
			jsonElement[keyName] = element.keyName;
		});

		// get the id of the element
		jsonElement._id = element._id;

		// get the references. Each reference will be stored as an array of ids
		Object.keys(element._reference_type).forEach((keyName) => {
			const listObj = element.keyName;
			const ids = [];
			listObj.forEach((elem) => {
				ids.push(elem._id);
			});
			jsonElement[keyName] = ids;
		});
	}



}
