const jwt = require('jsonwebtoken');
const config = require('./config');
const { HttpError } = require('./helpers/httpError');
const isCorrectAnswer = require('./helpers/isCorrectAnswer');
const { logInfo } = require('./helpers/produceLog');

const authorization = async (req, res) => {
    const { answer } = req.body;

    if(isCorrectAnswer(answer)) {
        const token = jwt.sign({
            answer
        }, config.jwtSecret, { expiresIn: config.tokenDuration });
        // return res.cookie('AuthorizationToken', token);
        // console.log('client info::')
        // console.log(req.header('user-agent'));
        // console.log(req.header('x-forwarded-for') || req.connection.remoteAddress);
        // console.log(req.header('referrer'));
        logInfo(`new token signed for ${config.tokenDuration}`);
        return res.send(token);
    }
    throw new HttpError(401, 'Unauthorized');
}

module.exports = { authorization }