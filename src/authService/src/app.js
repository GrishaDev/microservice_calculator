const express = require('express');
const morganLogger = require('morgan');
// const router = require('./router');
const { handleHttpError } = require ('./helpers/httpError');
const wa = require('./utils/wrapAsync');
const { authorization } = require('./controller');

const app = express();

app.use(morganLogger('dev'));
app.use(express.json());

app.post('/api/auth', wa(authorization));

app.use((err, req, res , next) => {
    handleHttpError(err, res);
});

const start = (port) => {
    app.listen(port, () => {
        console.log(`auth service running at ${port}`)
    })
    // return app;
}

module.exports = start;