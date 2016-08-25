'use strict';

/**
 * Serializes a JClass object to a JSON String
 */
export class SerializerJson {

	constructor(opts) {}

	/**
	 * Serializes a JClass element
	 * @param {object} element - The element to be serialized
	 * @param {number} indent - (Optionl) If given, makes beautiful JSON
	 * @returns {string} The serialized JSON String
	 */
	static serialize(element, indent) {
		// The element to be serialized
		const jsonElement = {};

		// copy the attributes
		Object.keys(element._property_types).forEach((keyName) => {
			jsonElement[keyName] = element[keyName];
		});

		// get the id of the element
		jsonElement._id = element._id;

		// get the class name of the element
		jsonElement.__class_name = element.constructor.name;

		// get the references. Each reference will be stored as an array of ids
		Object.keys(element._reference_type).forEach((keyName) => {
			const listObj = element[keyName];
			const ids = [];

			listObj.forEach((elem) => {
				ids.push(elem._id);
			});
			jsonElement[keyName] = ids;
		});

		return JSON.stringify(jsonElement, null, indent);
	}

	/**
	 * Unserializes a jsonString to real object
	 */
	static unserialize(jsonString){

	}

}
