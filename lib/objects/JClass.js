'use strict';

/**
 * Stores all the obejcts by there ID
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.JClass = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _objectRegistry = {};

/**
 * This is the unique id
 */
var _id = 1000;

var JClass = exports.JClass = function () {
	function JClass(opts) {
		(0, _classCallCheck3.default)(this, JClass);


		if (opts === undefined) {
			opts = {};
		}

		if (opts.data === undefined) {
			// used to set properties
			opts.data = {};
		}

		// Stores the meta information for each property
		this._property_types = {};

		// stores the meta information for the reference types
		this._reference_type = {};

		// if this object is contained, this stores the parent object
		// _parent.object = $object
		// _parent.property_name = $propertyName // the name of the reference
		this._parent = undefined;

		// stores the IDs of all the objects, which references this object.
		// This infomation is needed when this object is deleted.
		// Format:
		// _referenced_by.$objectId.property_name = $propertyName;
		// _referenced_by.$objectId.count = 2; // defines how often the object is referenced in this object
		this._referenced_by = {};

		// set the id for this object if not given
		if (opts.data._id) {
			this._id = opts.data._id;
			if (_id < opts.data._id) {
				_id = opts.data._id;
				_id++;
			}
		} else {
			this._id = _id++;
		}

		// store this object in the registry
		_objectRegistry[this._id] = this;
	}

	/**
  * Adds the inverse reference. Each object added as a reference to an other object
  * store the other object as an inverse reference.
  * @param {string} propertyName - The name of the reference this object was added to
  * @param {object} object - The object this object was added to a reference
  */


	(0, _createClass3.default)(JClass, [{
		key: '_addInverseReference',
		value: function _addInverseReference(propertyName, object) {}
		// TODO


		/**
   * Adds an element to the reference with the given name
   * @param {string} propName -  The name of the reference
   * @param {object} expectedClass - The expected class for this object
   * @param {object,number} element - The element or elementId to be added.
   */

	}, {
		key: '_referenceAddElement',
		value: function _referenceAddElement(propertyName, expectedClass, element) {

			// check that the property is a reference
			if (!this._isReference(propertyName)) {
				throw new Error('The given reference name \'' + propertyName + '\' is not a reference in the object \'' + this.constructor.name + '\'');
			}

			// The given element is an id, check that it reference a valid object
			if (typeof element === 'number') {
				element = this._getObjectForId(element);
			}

			// Check that the element if of the expected type
			if (expectedClass !== undefined && !(element instanceof expectedClass)) {
				throw new Error('The element \'' + element.constructor.name + '\' if not an instance of \'' + expectedClass.constructor.name + '\'');
			}

			// ok, add the element
			// TODO Wir haben verschieden typen von referencen
			this[propertyName].add(element._id);

			// add the inverse
			element._addInverseReference(propertyName, this);

			// if this reference is a containment reference then add the new parent to the element.
			if (this._isContainmentReference(propertyName)) {
				element._setParent(this);
			}
		}
	}, {
		key: '_referenceGetElements',
		value: function _referenceGetElements(propertyName) {
			// TODO
			// returns all the elements as object array
		}
	}, {
		key: '_referenceSetElements',
		value: function _referenceSetElements(propertyName, elements) {}
		// TODO
		// set all the element. The existing ones will be removed first
		// used if elemenst where reordered


		/**
   * This method returns true if the given reference is a containment reference.
   * @param {string} propertyName - The name of the reference
   * @returns {boolean} True if the given reference is a containment reference.
   */

	}, {
		key: '_isContainmentReference',
		value: function _isContainmentReference(propertyName) {
			if (this._isReference(propertyName)) {
				if (this._reference_type[propertyName].containment) {
					return true;
				}
			}
			return false;
		}

		/**
   * Set a new parent for this object
   * @param {string} propertyName - The name of the reference this object was added to
   * @param {object} object - The object this object was added to a reference
   */

	}, {
		key: '_setParent',
		value: function _setParent(propertyName, newParent) {
			this._removeFromParent();
			this._parent.property_name = propertyName;
			this._parent.object = newParent;
		}

		/**
   * Removes this object from its parent, if it has one
   */

	}, {
		key: '_removeFromParent',
		value: function _removeFromParent() {
			if (this._parent !== undefined) {
				// first this object must be removed from the old parent
				this._parent._removeReference(this._parent.property_name, this._parent.object);
			}
		}

		/**
   * The sequence for all the objects
   * @returns {number} A new sequence number
   */

	}, {
		key: '_getNewId',
		value: function _getNewId() {
			return _id++;
		}

		/**
   * Returns the object with the given ID. If the object does not exists
   * an error will be thrown
   * @param {number} id - The id of the object to be returned
   */

	}, {
		key: '_getObjectForId',
		value: function _getObjectForId(id) {
			if (_objectRegistry[id] === undefined) {
				throw new Error('The object with the id \'' + id + '\' does not exists');
			} else {
				return _objectRegistry[id];
			}
		}

		/**
   * Returns true if the given property is a Reference
   * @param {string} propertyName - The name of the property
   * @returns {boolean} True if the given property if of the type reference
   */

	}, {
		key: '_isReference',
		value: function _isReference(propertyName) {
			if (this._reference_type[propertyName] !== undefined) {
				return true;
			}
			return false;
		}

		/**
   * Returns the object type of a reference.
   * @param {string} propertyName - The name of the reference you would like to get the type for
   * @returns {string} The type of this reference
   */

	}, {
		key: '_getTypeForReference',
		value: function _getTypeForReference(propertyName) {
			if (this._isReference(propertyName)) {
				return this._reference_type[propertyName].type;
			} else {
				throw new Error('The given reference name \'' + propertyName + '\' is not a reference in the object \'' + this.constructor.name + '\'');
			}
		}

		/**
   * Returns true if the given property is a normal attribute
   * @param {string} propertyName - The name of the property
   * @returns {boolean} True if the given property is a normal attribute
   */

	}, {
		key: '_isAttribute',
		value: function _isAttribute(propertyName) {
			if (this._property_types[propertyName] !== undefined) {
				return true;
			}
			return false;
		}

		/**
   * Set all the given properties. This method is used when the data is loaded initially.
   * @protected
   * @param {object} obj - The object the data should be assigned to
   * @param {object} data - The data to be assigned to the object
   */

	}, {
		key: '_setAllProperties',
		value: function _setAllProperties(data) {
			var _this = this;

			(0, _keys2.default)(data).forEach(function (key) {
				_this[key] = data[key];
			});
		}

		/**
   * This method will be called if the given object should be deleted.
   * The method will remove all references to other objects.
   */

	}, {
		key: '_delete',
		value: function _delete() {
			// TODO
		}
	}]);
	return JClass;
}();