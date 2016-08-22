'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('./database');

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

  var type = _fromGlobalId.type;
  var id = _fromGlobalId.id;

  if (type === 'User') {
    return (0, _database.getUser)(id);
  }
  return null;
}, function (obj) {
  if (obj instanceof _database.User) {
    return GraphQLUser;
  }
  return null;
}); /**
     * This file provided by Facebook is for non-commercial testing and evaluation
     * purposes only.  Facebook reserves all rights not expressly granted.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
     * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
     * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
     * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     */

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;

// const GraphQLTodo = new GraphQLObjectType({
//   name: 'Todo',
//   fields: {
//     id: globalIdField('Todo'),
//     text: {
//       type: GraphQLString,
//       resolve: (obj) => obj.text,
//     },
//     complete: {
//       type: GraphQLBoolean,
//       resolve: (obj) => obj.complete,
//     },
//   },
//   interfaces: [nodeInterface],
// });
//
// const {
//   connectionType: TodosConnection,
//   edgeType: GraphQLTodoEdge,
// } = connectionDefinitions({
//   name: 'Todo',
//   nodeType: GraphQLTodo,
// });

var GraphQLUser = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: (0, _graphqlRelay.globalIdField)('User')
    // todos: {
    //   type: TodosConnection,
    //   args: {
    //     status: {
    //       type: GraphQLString,
    //       defaultValue: 'any',
    //     },
    //     ...connectionArgs,
    //   },
    //   resolve: (obj, {status, ...args}) =>
    //     connectionFromArray(getTodos(status), args),
    // },
    // totalCount: {
    //   type: GraphQLInt,
    //   resolve: () => getTodos().length,
    // },
    // completedCount: {
    //   type: GraphQLInt,
    //   resolve: () => getTodos('completed').length,
    // },
  },
  interfaces: [nodeInterface]
});

var Root = new _graphql.GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: function resolve() {
        return (0, _database.getViewer)();
      }
    },
    node: nodeField
  }
});

var schema = exports.schema = new _graphql.GraphQLSchema({
  query: Root
});