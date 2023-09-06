const { StatusCodes } = require("http-status-codes");
const Task = require("../models/Task");
const {BadRequestError,NotFoundError} = require('../errors')

const addTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json(task);
};

const getTask = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  const task = await Task.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const updateTask = async (req, res) => {
  const {
    body: { task, position },
    user: { userId },
    params: { id: taskId },
  } = req;

  if (task === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const newTask = await Task.findByIdAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!newTask) {
    throw new NotFoundError(`No job with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ newTask });
};

const deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findByIdAndRemove({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`No job with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({result:`deleted ${taskId}`});
};

module.exports = { addTask, getTask, getAllTasks, updateTask, deleteTask };
