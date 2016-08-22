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

// global stores
var ALL_ELEMENTS = {};

/*
 * Each element will get the following attributes
 * - parent {number} (If this element is contained) The ID of the parent object
 * - linked_by {set} (If this element is referenced by other ones)
 */

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


var id = 999;

var currentViewer = new __Viewer();

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

/**
 * Creates a new object of the given class
 * @protected
 * @param {class} clazz - The class of the object to be created
 * @param {object} data - The data to be assigned to the object
 * @returns {object} The created object
 */
function _addClass(clazz, data) {
  var val = new clazz();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  ALL_ELEMENTS[val.__id_unique] = val;
  return val;
}

/**
 * Adds a new created object to its parent object
 * @protected
 * @param {object} newObject - The newly created obejct
 * @param {integer} parentId - The id of the parent object
 * @param {string} referenceName - The name of the reference
 */
function _addReference(newObject, parentId, referenceName) {
  var parent = ALL_ELEMENTS[parentId];

  if (parent[referenceName] === undefined) {
    parent[referenceName] = [];
  }

  parent[referenceName].push(newObject.__id_unique);
}

function get__Viewer() {
  return currentViewer;
}

// --------------------------
// getter functions
// --------------------------

function getApplication(id) {
  return ALL_ELEMENTS[id];
}

function getEntitlement(id) {
  return ALL_ELEMENTS[id];
}

function getAccount(id) {
  return ALL_ELEMENTS[id];
}

function getIdentity(id) {
  return ALL_ELEMENTS[id];
}

// --------------------------
// creation functions
// --------------------------
function addApplication(data) {
  var val = _addClass(Application, data);
  return val.__id_unique;
}

/**
 * This is for elements which are contained in other ones
 */
function addEntitlement(data, parentId, referenceName) {
  var val = _addClass(Entitlement, data);
  _addReference(val, parentId, referenceName);
  return val.__id_unique;
}

/**
 * This is for elements which are contained in other ones
 */
function addAccount(data, parentId, referenceName) {
  var val = _addClass(Account, data);
  _addReference(val, parentId, referenceName);
  return val.__id_unique;
}

function addIdentity(data) {
  var val = _addClass(Identity, data);
  return val.__id_unique;
}

// --------------------------
// create test data
// --------------------------


var identity1 = addIdentity({
  "identity_id": "herbert.batz@gum.de",
  "first_name": "Herbert",
  "last_name": "Batz"
});

var identity2 = addIdentity({
  "identity_id": "hugo.flutz@gum.de",
  "first_name": "Hugo",
  "last_name": "Flutz"
});

var app1 = addApplication({
  "app_id": "4711",
  "name": "The Gumbors Head",
  "description": "The best description ever",
  "creation_date": "19.11.1983"
});

var ent1 = addEntitlement({
  "name": "Write",
  "description": "Allows write operations"
}, app1, 'entitlements');

var ent2 = addEntitlement({
  "name": "Read",
  "description": "Allows read operations"
}, app1, 'entitlements');