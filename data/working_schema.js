/**
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

import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import {
  User,
  getUser,
  getViewer
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  }
);

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

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User')
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
  interfaces: [nodeInterface],
});

const Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
    node: nodeField,
  },
});



export const schema = new GraphQLSchema({
  query: Root
});
