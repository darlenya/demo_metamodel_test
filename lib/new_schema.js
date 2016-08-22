'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schema = undefined;

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


var entitlement = new _graphql.GraphQLObjectType({
  name: 'Entitlement',
  description: 'An entitlement of an application, which could be assigned to an account.',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Entitlement', function (obj, context, info) {
        return obj.undefined;
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
var EntitlementConnection = (0, _graphqlRelay.connectionDefinitions)({ name: 'Entitlement', nodeType: entitlement });

var account = new _graphql.GraphQLObjectType({
  name: 'Account',
  description: 'The definition of an account',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Account', function (obj, context, info) {
        return obj.undefined;
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

var identity = new _graphql.GraphQLObjectType({
  name: 'Identity',
  description: '',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Identity', function (obj, context, info) {
        return obj.undefined;
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

var application = new _graphql.GraphQLObjectType({
  name: 'Application',
  description: 'The definition of an application',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Application', function (obj, context, info) {
        return obj.undefined;
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
        type: EntitlementConnection,
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

/*
 * The viewer is the user currently login in
 */
var Root = new _graphql.GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: identity,
      resolve: function resolve() {
        return getViewer();
      }
    },
    node: nodeField
  }
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
var Schema = exports.Schema = new _graphql.GraphQLSchema({
  query: Root
});