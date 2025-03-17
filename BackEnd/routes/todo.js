const router = require("express").Router();
const { todoModel, todoJoiSchema } = require("../models/Todo");
const asyncHandler = require("express-async-handler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const todo = await todoModel.find();
    res.status(200).json(todo);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const todo = await todoModel.findById(req.params.id);
    res.status(200).json(todo);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { todo } = req.body;
    const { error } = todoJoiSchema(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const newTodo = new todoModel({ todo });
    const result = await newTodo.save();

    res.status(200).json(result);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { todo } = req.body;
    const { error } = todoJoiSchema(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      { $set: { todo } },
      { new: true }
    );

    res.status(200).json(updatedTodo);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const deletedTodo = await todoModel.findByIdAndDelete(req.params.id);
    deletedTodo
      ? res
          .status(200)
          .json({ message: `todo id (${req.params.id}) has been deleted` })
      : res
          .status(404)
          .json({ message: `Error 404: todo id (${req.params.id}) not Found` });
  })
);

module.exports = router;
