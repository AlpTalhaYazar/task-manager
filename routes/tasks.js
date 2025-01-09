import express from 'express';
import { parseQuery } from '../middleware/parse-query.js';
import { getAllTasks, createTask, getTask, updateTask, deleteTask } from '../controllers/tasks.js';

const router = express.Router();

router.route('/').get(parseQuery, getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

export { router as taskRoutes };