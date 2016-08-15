
// global stores
const ALL_ELEMENTS = {};


// export classes
export class __Viewer {}
export class Application {}
export class Entitlement {}
export class Account {}
export class Identity {}

// --------------------------
// helper
// --------------------------
let id = 999;


/**
 * Returns a new unique id
 * @protected
 * @returns {integer} A new id
 */
function _getNextId(){
  id++;
  return id;
}

/**
 * Assigns data to an object
 * @protected
 * @param {object} obj - The object the data should be assigned to
 * @param {object} data - The data to be assigned to the object
 */
function _setAttributes(obj, data){
  Object.keys(data).forEach((key)=>{
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
function _addClass(clazz, data){
  const val = new clazz();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  ALL_ELEMENTS[val.__id_unique] = val;
  return val;
}


export function get__Viewer(){
  return ALL_ELEMENTS[1000];
}

// --------------------------
// getter functions
// --------------------------

export function getApplication(id){
  return ALL_ELEMENTS[id];
}

export function getEntitlement(id){
  return ALL_ELEMENTS[id];
}

export function getAccount(id){
  return ALL_ELEMENTS[id];
}

export function getIdentity(id){
  return ALL_ELEMENTS[id];
}

// --------------------------
// creation functions
// --------------------------


export function addApplication(data){
  const val = _addClass(Application, data);
  return val.__id_unique;
}

/**
 * This is for elemenst which are contained in other ones
 */
export function addEntitlement(data, parentId, referenceName){
  const val = new Entitlement();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  entitlementById[val.__id_unique] = val;
  ALL_ELEMENTS[val.__id_unique] = val;

  // add the element to its parent


  return val.__id_unique;
}

/**
 * This is for elemenst which are contained in other ones
 */
export function addAccount(data, parentId, referenceName){
  const val = new Account();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  accountById[val.__id_unique] = val;
  ALL_ELEMENTS[val.__id_unique] = val;
  // todo: weis noch nicht genau wie
  return val.__id_unique;
}

export function addIdentity(data){
  const val = _addClass(Identity, data);
  return val.__id_unique;
  // const val = new Identity();
  // val.__id_unique = _getNextId();
  // _setAttributes(val, data);
  // identityById[val.__id_unique] = val;
  // ALL_ELEMENTS[val.__id_unique] = val;
  // return val.__id_unique;
}


const identity1 = addIdentity({
  "identity_id" : "herbert.batz@gum.de",
  "first_name"  : "Herbert",
  "last_name"   : "Batz"
});

const identity2 = addIdentity({
  "identity_id" : "hugo.flutz@gum.de",
  "first_name"  : "Hugo",
  "last_name"   : "Flutz"
});

// const app1 = addApplication({
//   "app_id"        : "4711",
//   "name"          : "The Gumbors Head",
//   "description"   : "The best description ever",
//   "creation_date" : "19.11.1983"
// });
//
// const ent1 = addEntitlement(
//   {
//     "name"        : "Write",
//     "description" : "Allows write operations"
//   },app1,entitlements
// );
//
// const ent2 = addEntitlement(
//   {
//     "name"        : "Read",
//     "description" : "Allows read operations"
//   },app1,entitlements
// );
