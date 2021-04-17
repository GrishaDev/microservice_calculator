const jwt = require('jsonwebtoken');
const { HttpError } = require('./helpers/httpError');
const util = require('util');
const config = require('./config');

const averify = util.promisify(jwt.verify);

const isAuth = async (req, res, next) => {
    if(!config.isAuth) return next();

    // const token = req.cookies['MSGardenToken'];
    const token = req.header('auth');
    console.log(token);
    try {
        await averify(token, config.jwtPublic).catch(err => {throw new HttpError(401, 'Unauthorized');});
        return next();
    }
    catch(err) {
        return next(err);
    }
}

module.exports = { isAuth }