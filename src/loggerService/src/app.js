const express = require('express');
const morganLogger = require('morgan');
// const router = require('./router');
const { handleHttpError } = require ('./helpers/httpError');
const wa = require('./utils/wrapAsync');
const { getErrorLogs, getInfoLogs } = require('./controller');
const { isAuth } = require('./isAuth');

const app = express();

app.use(morganLogger('dev'));
app.use(express.json());

app.use('/api', isAuth);
app.get('/api/logs/error', wa(getErrorLogs));
app.get('/api/logs/info', wa(getInfoLogs));

app.use((err, req, res , next) => {
    handleHttpError(err, res);
});

const start = (port) => {
    app.listen(port, () => {
        console.log(`logger service running at ${port}`)
    })
    // return app;
}

module.exports = start;