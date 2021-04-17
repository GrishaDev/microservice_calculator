

const jwt = require('jsonwebtoken');
const fs = require('fs');
const util = require('util');
const path = require('path');
const { HttpError } = require ('./helpers/httpError');

const config = require('./config');

const areadFile = util.promisify(fs.readFile);
const areadDir = util.promisify(fs.readdir);

const getErrorLogs = async (req, res) => {
    const logsPath = path.resolve(__dirname, `./../logs/error`);

    const fileNames = await areadDir(logsPath).catch(err=> {console.log(err); throw new HttpError(400, 'no logs')});
    if(!fileNames) return res.json([]);

    const logs = await Promise.all(fileNames.map(async (file)=> {
        let logsFile = await areadFile(`${logsPath}/${file}`, 'utf-8');
        let logsArr = logsFile.split('\n');
        return {file, logs: logsArr};
    }));
    return res.json(logs);
}

const getInfoLogs = async (req, res) => {
    const logsPath = path.resolve(__dirname, `./../logs/info`);

    const fileNames = await areadDir(logsPath).catch(err=> {console.log(err); throw new HttpError(400, 'no logs')});
    if(!fileNames) return res.json([]);
    
    const logs = await Promise.all(fileNames.map(async (file)=> {
        let logsFile = await areadFile(`${logsPath}/${file}`, 'utf-8');
        let logsArr = logsFile.split('\n');
        return {file, logs: logsArr};
    }));
    return res.json(logs);
}

module.exports = { getErrorLogs, getInfoLogs }