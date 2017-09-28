declare var graphqlFields: any; // déclaration pour typescript

import { GraphQLSchema, GraphQLString, GraphQLObjectType } from 'graphql';
import * as graphqlFields from 'graphql-fields';

import ping from './Fields/ping';

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
        ping,
    }),
});

export default new GraphQLSchema({
    query: QueryType,
});