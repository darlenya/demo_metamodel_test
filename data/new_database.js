
// mock data stores
const applicationById = {};
const entitlementById = {};
const accountById = {};
const identityById = {};


// export classes
export class __Viewer {}
export class Application {}
export class Entitlement {}
export class Account {}
export class Identity {}



// --------------------------
// helper
// --------------------------
let id = 1000;


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

export function get__Viewer(){
  return identityById[1000];
}

// --------------------------
// getter functions
// --------------------------

export function getApplication(id){
  return applicationById[id];
}

export function getEntitlement(id){
  return entitlementById[id];
}

export function getAccount(id){
  return accountById[id];
}

export function getIdentity(id){
  return identityById[id];
}

// --------------------------
// creation functions
// --------------------------

export function addApplication(data){
  const val = new Application();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  applicationById[val.__id_unique] = val;
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
  // todo: weis noch nicht genau wie
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
  // todo: weis noch nicht genau wie
  return val.__id_unique;
}

export function addIdentity(data){
  const val = new Identity();
  val.__id_unique = _getNextId();
  _setAttributes(val, data);
  identityById[val.__id_unique] = val;
  return val.__id_unique;
}


addIdentity({
  "identity_id" : "herbert.batz@gum.de",
  "first_name"  : "Herbert",
  "last_name"   : "Batz"
})
