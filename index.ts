import * as express from 'express';
import * as graphql from 'graphql';
import * as graphQLHTTP from 'express-graphql';

import * as bodyParser from 'body-parser';

import schema from './src/Schema/index';

const app = express();
const PORT = 1234;

app.use(bodyParser.text({ type: 'application/graphql' }));

app.use('/graphql', graphQLHTTP(() => ({
    schema,
    graphiql: true,
    formatError: error => {
        return {
            message: error.message,
            locations: error.locations,
            stack: error.stack,
            path: error.path
        };
    },
})));

app.listen(PORT, function () {
    console.log('Server listening to port ' + PORT);
});