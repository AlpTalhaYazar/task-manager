const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        var tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);

        var createdTask = await task.save();

        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTask = async (req, res) => {
    try {
        var task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.id
            });
        }

        res.json(task);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.id
            });
        }

        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.id
        });
    }
}

const updateTask = async (req, res) => {
    try {
        var task = await Task.findByIdAndUpdate(req.params.id);

        if (!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.id
            });
        }

        res.json(task);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.id
            });
        }

        return res.status(500).send({
            message: "Error updating task with id " + req.params.id
        });
    }
}

const deleteTask = async (req, res) => {
    try {
        var task = await Task.findByIdAndRemove(req.params.id);

        if (!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.id
            });
        }

        res.json({ message: "Task deleted successfully!" });
    } catch (error) {
        if (error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.id
            });
        }

        return res.status(500).send({
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