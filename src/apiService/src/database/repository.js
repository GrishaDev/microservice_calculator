const { HttpError } = require('../helpers/httpError');
const schema = require('./schema');

class Repository {
    
    static async getCalculations() {
        try {
            const calculations = await schema.find({});
            console.log(calculations);
            return calculations;
        }
        catch(err) {
            console.log(err); 
            throw new Error('failed getting calculations');
        }
    }

    static async getCalculation(id) {
        try {
            const calculation = await schema.find({_id: id})
            return calculation.toObject();
        }
        catch(err) {
            console.log(err); 
            throw new Error(`failed getting calculation ${id}`);
        }
    }

    static async addCalculation() {
        try {
            const calculation = new schema();
            const result = await calculation.save();
            return result.toObject();
        }
        catch(err) {
            console.log(err);
            throw new Error(`failed initiating new calculation`);
        }
    }

    static async updateCalculation(id, data) {
        try {
            const calculation = await schema.findByIdAndUpdate({_id: id}, data, {new: true});
            return calculation.toObject();
        }
        catch(err) {
            console.log(err);
            throw new Error(`failed updating calculation ${id}`);
        }
    }

    static async deleteCalculation(id) {
        try {
            const calculation = await schema.findByIdAndRemove({_id: id});
            return calculation.toObject();
        }
        catch(err) {
            console.log(err);
            throw new Error(`failed deleting calculation ${id}`);
        }
    }
}

module.exports = Repository;