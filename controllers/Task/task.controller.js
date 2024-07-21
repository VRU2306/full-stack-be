const taskService = require("../../services/Task/task.service");

const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ errorMsg: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const filters = req.query;
        const tasks = await taskService.getTasks(filters);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ errorMsg: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ errorMsg: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        if (!task) {
            return res.status(404).json({ message: "Task not found please check once" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ errorMsg: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ errorMsg: error.message });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
