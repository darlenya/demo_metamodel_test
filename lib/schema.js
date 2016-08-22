'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('./database');

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var res = (0, _graphqlRelay.fromGlobalId)(globalId);
  var type = res.type;
  var id = res.id;

  if (type === 'Application') {
    return (0, _database.getApplication)(id);
  } else if (type === 'Entitlement') {
    return (0, _database.getEntitlement)(id);
  } else if (type === 'Account') {
    return (0, _database.getAccount)(id);
  } else if (type === 'Identity') {
    return (0, _database.getIdentity)(id);
  } else {
    return null;
  }
}, function (obj) {

  if (obj instanceof _database.Application) {
    return applicationType;
  } else if (obj instanceof _database.Entitlement) {
    return entitlementType;
  } else if (obj instanceof _database.Account) {
    return accountType;
  } else if (obj instanceof _database.Identity) {
    return identityType;
  } else {
    return null;
  }
}); /**
     *  Copyright (c) 2015, Facebook, Inc.
     *  All rights reserved.
     *
     *  This source code is licensed under the BSD-style license found in the
     *  LICENSE file in the root directory of this source tree. An additional grant
     *  of patent rights can be found in the PATENTS file in the same directory.
     */

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;


var entitlementType = new _graphql.GraphQLObjectType({
  name: 'Entitlement',
  description: 'An entitlement of an application, which could be assigned to an account.',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Entitlement', function (obj, context, info) {
        return obj.__id_unique;
      }),
      name: {
        type: _graphql.GraphQLString,
        description: 'The ID for this entitlement per application'
      },
      description: {
        type: _graphql.GraphQLString,
        description: ''
      },
      __id_unique: {
        type: _graphql.GraphQLInt,
        description: ''
      },
      __id_hash: {
        type: _graphql.GraphQLString,
        description: ''
      },
      __content_hash: {
        type: _graphql.GraphQLString,
        description: ''
      }
    };
  },
  interfaces: [nodeInterface]
});
var EntitlementConnection = (0, _graphqlRelay.connectionDefinitions)({ name: 'Entitlement', nodeType: entitlementType });

var accountType = new _graphql.GraphQLObjectType({
  name: 'Account',
  description: 'The definition of an account',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Account', function (obj, context, info) {
        return obj.__id_unique;
      }),
      account_id: {
        type: _graphql.GraphQLString,
        description: 'The ID for this account'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the application'
      },
      description: {
        type: _graphql.GraphQLString,
        description: ''
      },
      creation_date: {
        type: _graphql.GraphQLInt,
        description: ''
      },
      __id_unique: {
        type: _graphql.GraphQLInt,
        description: ''
      },
      __id_hash: {
        type: _graphql.GraphQLString,
        description: ''
      },
      __content_hash: {
        type: _graphql.GraphQLString,
        description: ''
      }
    };
  },
  interfaces: [nodeInterface]
});

var identityType = new _graphql.GraphQLObjectType({
  name: 'Identity',
  description: '',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Identity', function (obj, context, info) {
        return obj.__id_unique;
      }),
      identity_id: {
        type: _graphql.GraphQLString,
        description: 'An id identifying this identity'
      },
      first_name: {
        type: _graphql.GraphQLString,
        description: ''
      },
      last_name: {
        type: _graphql.GraphQLString,
        description: ''
      },
      email: {
        type: _graphql.GraphQLString,
        description: ''
      },
      date_of_birth: {
        type: _graphql.GraphQLInt,
        description: ''
      },
      __id_unique: {
        type: _graphql.GraphQLInt,
        description: ''
      },
      __id_hash: {
        type: _graphql.GraphQLString,
        description: ''
      },
      __content_hash: {
        type: _graphql.GraphQLString,
        description: ''
      }
    };
  },
  interfaces: [nodeInterface]
});
var IdentityConnection = (0, _graphqlRelay.connectionDefinitions)({ name: 'Identity', nodeType: identityType });

var applicationType = new _graphql.GraphQLObjectType({
  name: 'Application',
  description: 'The definition of an application',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Application', function (obj, context, info) {
        return obj.__id_unique;
      }),
      app_id: {
        type: _graphql.GraphQLString,
        description: 'The ID for this application'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the application'
      },
      description: {
        type: _graphql.GraphQLString,
        description: ''
      },
      creation_date: {
        type: _graphql.GraphQLInt,
        description: ''
      },
      __id_unique: {
        type: _graphql.GraphQLInt,
        description: ''
      },
      __id_hash: {
        type: _graphql.GraphQLString,
        description: ''
      },
      __content_hash: {
        type: _graphql.GraphQLString,
        description: ''
      },
      entitlements: {
        type: EntitlementConnection.connectionType,
        description: '',
        args: _graphqlRelay.connectionArgs,
        resolve: function resolve(parent, args) {
          return (0, _graphqlRelay.connectionFromArray)(parent.entitlements.map(function (id) {
            return (0, _database.getEntitlement)(id);
          }), args);
        }
      }
    };
  },
  interfaces: [nodeInterface]
});

var __viewerType = new _graphql.GraphQLObjectType({
  name: '__Viewer',
  description: 'The currently connected user',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('__Viewer', function (obj, context, info) {
        return obj.id;
      }),
      identities: {
        type: IdentityConnection.connectionType,
        description: 'Get all identities',
        args: _graphqlRelay.connectionArgs,
        resolve: function resolve(parent, args) {
          return (0, _graphqlRelay.connectionFromArray)(parent.identities.map(function (id) {
            return (0, _database.getIdentity)(id);
          }), args);
        }
      }
    };
  },
  interfaces: [nodeInterface]
});

/*
 * The viewer is the user currently login in
 */
var Root = new _graphql.GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: __viewerType,
      resolve: function resolve() {
        return (0, _database.get__Viewer)();
      }
    },
    node: nodeField
  }
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
var schema = exports.schema = new _graphql.GraphQLSchema({
  query: Root
});