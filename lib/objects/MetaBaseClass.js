'use strict';

/**
 * Stores all the obejcts by there ID
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MetaBaseClass = undefined;

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

var MetaBaseClass = exports.MetaBaseClass = function () {
	function MetaBaseClass(opts) {
		(0, _classCallCheck3.default)(this, MetaBaseClass);


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
  * The sequence for all the objects
  * @returns {number} A new sequence number
  */


	(0, _createClass3.default)(MetaBaseClass, [{
		key: '_isReference',


		/**
   * Returns true if the given property is a Reference
   * @param {string} propertyName - The name of the property
   * @returns {boolean} True if the given property if of the type reference
   */
		value: function _isReference(propertyName) {
			if (this._reference_type[propertyName] !== undefined) {
				return true;
			}
			return false;
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
	}], [{
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
	}]);
	return MetaBaseClass;
}();