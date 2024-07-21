const validateTaskData = (taskData) => {
    if (!taskData.title || typeof taskData.title !== 'string') {
        throw new Error("Invalid or missing 'title'.");
    }
    if (!taskData.column || typeof taskData.column !== 'string') {
        throw new Error("Invalid or missing 'column'.");
    }
    if (taskData.taskDueDate && isNaN(new Date(taskData.taskDueDate).getTime())) {
        throw new Error("Invalid 'taskDueDate'.");
    }
    if (!taskData.userId || typeof taskData.userId !== 'string') {
        throw new Error("Invalid or missing 'userId'.");
    }
};

module.exports = {
    validateTaskData
}