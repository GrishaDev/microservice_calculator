const mongoose = require('mongoose');
const shortid = require('shortid');

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: shortid.generate
    },
    result: {
        type: Number,
        required: false,
    },
    operationType: {
        type: String,
        required: false
    }
});

const normalize = (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
}

schema.set('toJSON', {
    transform: normalize
});

schema.set('toObject', {
    transform: normalize
});

module.exports = mongoose.model(`calculations`, schema);