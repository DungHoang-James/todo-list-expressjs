const express = require('express');

function routes(ToDo) {
    const todoRouter = express.Router();

    todoRouter.route('/todo')
        .get((req, res) => {
            const query = {};

            // if (req.query.id) {
            //     query._id = req.query.id;
            // }

            ToDo.find(query, (err, data) => {
                if (err) {
                    return res.send(err)
                }

                const returnTodo = data.map((todo) => {
                    let newTodo = todo.toJSON();
                    newTodo.links = {};
                    newTodo.links.self = `http://${req.headers.host}/api/todo/${todo._id}`;
                    return newTodo;
                })
                return res.json(returnTodo);
            })
        })
        .post((req, res) => {
            const todo = new ToDo(req.body);
            todo.save();
            return res.status(201).json(todo);
        });

    todoRouter.use('/todo/:todoId', (req, res, next) => {
        ToDo.findById(req.params.todoId, (err, data) => {
            if (err) {
                return res.send(err);
            }

            if (data) {
                req.todo = data;
                return next();
            }

            return res.sendStatus(404);
        })
    })

    todoRouter.route('/todo/:todoId')
        .get((req, res) => res.json(req.todo))
        .put((req, res) => {
            const { todo } = req;

            todo.title = req.body.title;
            todo.isDone = req.body.isDone;

            req.todo.save((err) => {
                if (err) {
                    return res.send(err);
                }

                return res.json(todo);
            });
        })
        .patch((req, res) => {
            const { todo } = req;

            if (req.body._id) {
                delete req.body._id;
            }

            Object.entries(req.body).forEach(item => {
                const key = item[0];
                const value = item[1];
                todo[key] = value;
            });

            req.todo.save((err) => {
                if (err) {
                    return res.send(err);
                }

                return res.json(todo);
            });
        })
        .delete((req, res) => {
            req.todo.remove((err) => {
                if (err) {
                    return res.send(err);
                }

                return res.sendStatus(204);
            })
        });

    return todoRouter;
}

module.exports = routes;