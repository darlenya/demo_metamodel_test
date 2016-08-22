"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identity = exports.Account = exports.Entitlement = exports.Application = exports.__Viewer = undefined;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.get__Viewer = get__Viewer;
exports.getApplication = getApplication;
exports.getEntitlement = getEntitlement;
exports.getAccount = getAccount;
exports.getIdentity = getIdentity;
exports.addApplication = addApplication;
exports.addEntitlement = addEntitlement;
exports.addAccount = addAccount;
exports.addIdentity = addIdentity;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// mock data stores
var applicationById = {};
var entitlementById = {};
var accountById = {};
var identityById = {};

// export classes

var __Viewer = exports.__Viewer = function __Viewer() {
  (0, _classCallCheck3.default)(this, __Viewer);
};

var Application = exports.Application = function Application() {
  (0, _classCallCheck3.default)(this, Application);
};

var Entitlement = exports.Entitlement = function Entitlement() {
  (0, _classCallCheck3.default)(this, Entitlement);
};

var Account = exports.Account = function Account() {
  (0, _classCallCheck3.default)(this, Account);
};

var Identity = exports.Identity = function Identity() {
  (0, _classCallCheck3.default)(this, Identity);
};

// --------------------------
// helper
// --------------------------


var id = 1000;

/**
 * Returns a new unique id
 * @protected
 * @returns {integer} A new id
 */
function _getNextId() {
  id++;
  return id;
}

/**
 * Assigns data to an object
 * @protected
 * @param {object} obj - The object the data should be assigned to
 * @param {object} data - The data to be assigned to the object
 */
function _setAttributes(obj, data) {
  (0, _keys2.default)(data).forEach(function (key) {
    obj[key] = data[key];
  });
}

function get__Viewer() {
  return identityById[1000];
}

// --------------------------
// getter functions
// --------------------------

function getApplication(id) {
  return applicationById[id];
}

function getEntitlement(id) {
  return entitlementById[id];
}

function getAccount(id) {
  return accountById[id];
}

function getIdentity(id) {
  return identityById[id];
}

// --------------------------
// creation functions
// --------------------------

function addApplication(data) {
  var val = new Application();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  applicationById[val.__id_unique] = val;
  return val.__id_unique;
}

/**
 * This is for elemenst which are contained in other ones
 */
function addEntitlement(data, parentId, referenceName) {
  var val = new Entitlement();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  entitlementById[val.__id_unique] = val;
  // todo: weis noch nicht genau wie
  return val.__id_unique;
}

/**
 * This is for elemenst which are contained in other ones
 */
function addAccount(data, parentId, referenceName) {
  var val = new Account();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  accountById[val.__id_unique] = val;
  // todo: weis noch nicht genau wie
  return val.__id_unique;
}

function addIdentity(data) {
  var val = new Identity();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  identityById[val.__id_unique] = val;
  return val.__id_unique;
}

addIdentity({
  "identity_id": "herbert.batz@gum.de",
  "first_name": "Herbert",
  "last_name": "Batz"
});