const getAllTasks = (req, res) => {
    res.send('All Tasks');
};

const createTask = (req, res) => {
    res.send('Create Task');
};

const getTask = (req, res) => {
    res.send('Get Task with id ' + req.params.id);
}

const updateTask = (req, res) => {
    res.send('Update Task with id ' + req.params.id);
}

const deleteTask = (req, res) => {
    res.send('Delete Task with id ' + req.params.id);
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};