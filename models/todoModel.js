const mongooes = require('mongoose');

const { Schema } = mongooes;

const todoSchema = new Schema({
    title: String,
    isDone: Boolean,
});

module.exports = mongooes.model('ToDo', todoSchema);