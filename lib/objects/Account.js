'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Account = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _JClass2 = require('./JClass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { Entitlement } from './Entitlement';


var Account = exports.Account = function (_JClass) {
	(0, _inherits3.default)(Account, _JClass);

	function Account(opts) {
		(0, _classCallCheck3.default)(this, Account);

		// Stores the meta infomation for each property
		var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Account).call(this, opts));

		_this._property_types = {
			'app_id': 'string',
			'name': 'string',
			'description': 'string',
			'creation_date': 'date'
		};

		// stores the metainformation for the reference types
		_this._reference_type = {
			'entitlements': {
				'containment': true,
				'unique': true,
				'upper_bound': -1,
				'type': 'Entitlement'
			}
		};

		_this.entitlements = new _set2.default();
		return _this;
	}

	(0, _createClass3.default)(Account, [{
		key: 'addEntitlement',
		value: function addEntitlement(entitlement) {
			if ((typeof entitlement === 'undefined' ? 'undefined' : (0, _typeof3.default)(entitlement)) === 'object') {
				if (entitlement instanceof Entitlement) {
					this.entitlement.add(entitlement._id);
				} else {
					throw new Error('The given object is not of type \'Entitlement\'');
				}
			} else if (typeof entitlement === 'number') {
				this.entitlement.add(entitlement);
			} else {
				throw new Error('The given value is neither an object nor a number');
			}
		}
	}]);
	return Account;
}(_JClass2.JClass);