const Task = require('../models/Task');
const { StatusCodes } = require('http-status-codes');

const getAllTasks = async (req, res) => {
    try {
        var tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);

        var createdTask = await task.save();

        res.status(StatusCodes.CREATED)
            .json(createdTask);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        var task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(StatusCodes.NOT_FOUND)
                .send({
                    message: "Task not found with id " + req.params.id
                });
        }

        res.json(task);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(StatusCodes.NOT_FOUND)
                .send({
                    message: "Task not found with id " + req.params.id
                });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                message: "Error retrieving task with id " + req.params.id
            });
    }
}

const updateTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        
        var updatedTask = await Task.findByIdAndUpdate(req.params.id, 
            { name: task.name, completed: task.completed },
            { new: true, runValidators: true });

        if (!updatedTask) {
            return res.status(StatusCodes.NOT_FOUND)
                .send({
                    message: "Task not found with id " + req.params.id
                });
        }

        res.json(updatedTask);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(StatusCodes.NOT_FOUND)
                .send({
                    message: "Task not found with id " + req.params.id
                });
        }

        console.log(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                message: "Error updating task with id " + req.params.id
            });
    }
}

const deleteTask = async (req, res) => {
    try {
        var task = await Task.findByIdAndRemove(req.params.id);

        if (!task) {
            return res.status(StatusCodes.NOT_FOUND)
                .send({
                    message: "Task not found with id " + req.params.id
                });
        }

        res.json({ message: "Task deleted successfully!" });
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(StatusCodes.NOT_FOUND)
                .send({
                    message: "Task not found with id " + req.params.id
                });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                message: "Could not delete task with id " + req.params.id
            });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};