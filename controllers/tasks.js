import { Task } from "../models/Task.js";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async.js";
import { Result, PaginationResult } from "../utils/Result.js";
import { createCustomError } from "../errors/custom-error.js";

const getAllTasks = asyncWrapper(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "-createdAt",
    fields = "",
    ...queryFilter
  } = req.query;

  const pageLimit = parseInt(limit);
  const skip = (page - 1) * pageLimit;

  if (page < 1) {
    throw createCustomError("Page value must be greater than 0", 400);
  }
  if (limit < 1) {
    throw createCustomError("Limit value must be greater than 0", 400);
  }

  if (search) {
    queryFilter.name = { $regex: search, $options: "i" };
  }

  const querySort = sort.split(",").join(" ");

  const [tasks, total] = await Promise.all([
    Task.find()
      .where(queryFilter)
      .sort(querySort)
      .skip(skip)
      .limit(pageLimit)
      .select(fields ? fields.split(",").join(" ") : "")
      .lean()
      .exec(),
    Task.countDocuments(queryFilter),
  ]);

  const result = new PaginationResult(tasks, page, limit, total);

  res.status(StatusCodes.OK).json(result);
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
