const Task = require("../../models/Task/tasks");
const { validateTaskData } = require("../../helpers/taskValidation")


const createTask = async (taskData) => {
    validateTaskData(taskData);
    const task = new Task(taskData);
    return await task.save();
};

const getTasks = async (filters = {}) => {
    const query = {};

    if (filters.userId) {
        query.userId = filters.userId;
    }
    return await Task.find(query);
};

const getTaskById = async (id) => {
    return await Task.findById(id);
};

const updateTask = async (id, taskData) => {
    taskData.modified = new Date();
    return await Task.findByIdAndUpdate(id, taskData, { new: true });
};

const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
