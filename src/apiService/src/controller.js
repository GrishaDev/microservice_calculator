const { HttpError } = require('./helpers/httpError');
const { rabbitmqProduce } = require('./broker/rabbitmq');
const Repository = require('./database/repository');
const config = require('./config');
class Controller {

    static async health(req, res) {
        res.send('ok');
    }

    static async getCalculations(req, res) {
        const calculations = await Repository.getCalculations();
        res.json(calculations);
    }

    static async getCalculation(req, res) {
        const { id } = req.params;
        const calculation = await Repository.getCalculation(id);
        res.json(calculation);
    }

    static async removeCalculation(req, res) {
        const { id } = req.params;
        const calculation = await Repository.removeCalculation(id);
        res.json(calculation);
    }

    static async addAddition(req, res) {
        const result = await createCalculation(config.additionQueue, req.body);
        res.json(result);
    }

    static async addSubtraction(req, res) {
        const result = await createCalculation(config.subtractionQueue, req.body);
        res.json(result);
    }

    static async addMultiplication(req, res) {
        const result = await createCalculation(config.multiplicationQueue, req.body);
        res.json(result);
    }

    static async addDivision(req, res) {
        const result = await createCalculation(config.divisionQueue, req.body);
        res.json(result);
    }
}

const createCalculation = async (brokerQueue, data) => {
    const calculation = await Repository.addCalculation();
    const calcId = calculation.id;
    await rabbitmqProduce(brokerQueue, {calcId, data});
    return calculation;
}

module.exports = Controller;