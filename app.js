const express = require('express');
const mongooes = require('mongoose');
const bodyParser = require('body-parser');
const ToDo = require('./models/todoModel');
const todoRouter = require('./routes/todoRouter')(ToDo);

const db = mongooes.connect('mongodb://root:example@mongo:27017/TodoListDb');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', todoRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});