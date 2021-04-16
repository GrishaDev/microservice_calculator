const express = require('express');
const morganLogger = require('morgan');
const router = require('./router');
const { handleHttpError } = require ('./helpers/httpError');

const app = express();

app.use(morganLogger('dev'));
app.use(express.json());

app.use('/api', router);

app.use((err, req, res , next) => {
    handleHttpError(err, res);
});

const start = (port) => {
    app.listen(port, () => {
        console.log(`http service running at ${port}`)
    })
    // return app;
}

module.exports = start;