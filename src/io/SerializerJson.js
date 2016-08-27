'use strict';

/**
 * Serializes a JClass object to a JSON String
 */
export class SerializerJson {

	constructor(opts) {}

	/**
	 * Serializes a model
	 * @param {object} model - The Model to be serialized
	 * @param {number} indent - (Optionl) If given, makes beautiful JSON
	 * @returns {string} The serialized JSON String
	 */
	static serialize(model, indent) {
		const allElementIds = model.getAllObjectIds();
		const result = [];

		allElementIds.forEach((elementId) => {
			const element = model.getObjectForId(elementId);
			const objAsString = SerializerJson._serializeElement(element, indent);
			result.push(objAsString);
		});

		return JSON.stringify(result, null, indent);
	}

	/**
	 * Deserializes a single element. The result is added to the model
	 * @param {object} model - The Model which stores the data
	 * @param {string} content - The file constent to be deserialized
	 */
	static deserialize(model, content){
		// The json object is an array of object to be created
		const jsonObjects = JSON.parse(content);

		// first create the objects with there attributes
		jsonObjects.forEach((obj)=>{
			SerializerJson._deserializeElement(model, obj);
		});

		// second create the references
		jsonObjects.forEach((obj)=>{
			SerializerJson._createReferences(model, obj);
		});

	}


	/**
	 * Creates the references between the objects
	 * @param {object} model - The Model which stores the data
	 * @param {object} obj - The json object to be converted in a real one
	 */
	static _createReferences(model, obj) {
		const id = obj.id;
		const realObject = model.getObjectForId(id);

		Object.keys(realObject._reference_type).forEach((refAttributeName)=>{
				if(obj[refAttributeName] !== undefined){
					// does the object has data for this reference

					// get all the target object ids of the objects to be added to this reference
					const elementIds = obj[refAttributeName];

					elementIds.forEach((targetId)=>{
						const realTarget = model.getObjectForId(targetId);
						const refList = realObject[refAttributeName];
						refList.add(realTarget);
					});
				}
		});
	}


	/**
	 * Serializes a JClass element
	 * @param {object} model - The Model which stores the data
	 * @param {object} obj - The json object to be converted in a real one
	 */
	static _deserializeElement(model, obj) {
		const className = obj.instanceName;
		const id = obj.id;
		model.createObject(className, obj, {'id' : id});
	}

	/**
	 * Serializes a JClass element
	 * @param {object} element - The element to be serialized
	 * @param {number} indent - (Optionl) If given, makes beautiful JSON
	 * @returns {object} An element which could be serialized
	 */
	static _serializeElement(element, indent) {
		// The element to be serialized
		const jsonElement = {};

		// copy the attributes
		Object.keys(element._property_types).forEach((keyName) => {
			jsonElement[keyName] = element[keyName];
		});

		// get the id of the element
		jsonElement.id = element.id;

		// get the class name of the element
		jsonElement.instanceName = element.instanceName;

		// get the references. Each reference will be stored as an array of ids
		Object.keys(element._reference_type).forEach((keyName) => {
			const listObj = element[keyName];
			const ids = [];

			listObj.forEach((elem) => {
				ids.push(elem._id);
			});
			jsonElement[keyName] = ids;
		});

		return jsonElement;
	}


}
