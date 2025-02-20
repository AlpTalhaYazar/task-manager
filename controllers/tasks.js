import { Task } from "../models/Task.js";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async.js";
import { Result, PaginationResult } from "../utils/Result.js";
import { createCustomError } from "../errors/custom-error.js";

const getAllTasks = asyncWrapper(async (req, res) => {
  const { sort, pageNum, limitNum, skip, fields, ...queryFilter } =
    req.queryFilter;

  const [tasks, total] = await Promise.all([
    Task.find(queryFilter)
      .sort(req.queryFilter.sort)
      .limit(req.queryFilter.limitNum)
      .skip(req.queryFilter.skip)
      .select(req.queryFilter.fields ? req.queryFilter.fields : "")
      .lean()
      .exec(),
    Task.countDocuments(queryFilter),
  ]);

  const result = new PaginationResult(tasks, pageNum, limitNum, total);

  res.status(200).json(result);
});

const createTask = asyncWrapper(async (req, res) => {
  const task = new Task(req.body);

  const createdTask = await task.save();

  const result = Result.success(createdTask);

  res.status(StatusCodes.CREATED).json(result);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(
      createCustomError(`No task with id : ${taskID}`, StatusCodes.NOT_FOUND)
    );
  }

  const result = Result.success(task);

  res.status(StatusCodes.OK).json(result);
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(
      createCustomError(`No task with id : ${taskID}`, StatusCodes.NOT_FOUND)
    );
  }

  const result = Result.success(task);

  res.status(StatusCodes.OK).json(result);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(
      createCustomError(`No task with id : ${taskID}`, StatusCodes.NOT_FOUND)
    );
  }

  const result = Result.success(task);

  res.status(StatusCodes.OK).json(result);
});

export { getAllTasks, createTask, getTask, updateTask, deleteTask };
