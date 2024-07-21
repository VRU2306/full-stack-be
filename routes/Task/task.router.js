const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/Task/task.controller");
const auth = require("../../middleware/auth")

router.post("/tasks",auth.verifyToken, taskController.createTask);
router.get("/tasks",auth.verifyToken, taskController.getTasks);
router.get("/tasks/:id",auth.verifyToken, taskController.getTaskById);
router.patch("/tasks/:id",auth.verifyToken, taskController.updateTask);
router.delete("/tasks/:id",auth.verifyToken, taskController.deleteTask);

module.exports = router;
