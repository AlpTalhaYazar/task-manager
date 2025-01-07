const Task = require('../models/Task');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middleware/async');
const Result = require('../utils/Result');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});

    const result = Result.success(tasks);

    res.status(StatusCodes.OK)
        .json(result);
});

const createTask = asyncWrapper(async (req, res) => {
    const task = new Task(req.body);

    const createdTask = await task.save();

    const result = Result.success(createdTask);

    res.status(StatusCodes.CREATED)
        .json(result);
});

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;

    const task = await Task.findOne({ _id: taskID });

    if (!task) {
        const error = new Error(`No task with id : ${taskID}`);
        error.status = StatusCodes.NOT_FOUND;

        return next(error);
    }

    const result = Result.success(task);

    res.status(StatusCodes.OK)
        .json(result);
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body,
        {
            new: true,
            runValidators: true
        });

    if (!task) {
        const error = new Error(`No task with id : ${taskID}`);
        error.status = StatusCodes.NOT_FOUND;

        return next(error);
    }

    const result = Result.success(task);

    res.status(StatusCodes.OK)
        .json(result);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndDelete
        ({ _id: taskID });

    if (!task) {
        const error = new Error(`No task with id : ${taskID}`);
        error.status = StatusCodes.NOT_FOUND;

        return next(error);
    }

    const result = Result.success(task);

    res.status(StatusCodes.OK)
        .json(result);
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};