const mongoose = require("mongoose")
const Joi = require("joi")

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        trim: true,
        require:true,
        minlength: 1,
        maxlength: 200
    }
},{
    timestamps:true
})

const todoModel = mongoose.model("todoSchema", todoSchema)

const todoJoiSchema = (obj) => {
    const Schema = Joi.object({
        todo: Joi.string().trim().min(1).max(200).required()
    })
    return Schema.validate(obj)
}

module.exports = {
    todoModel, todoJoiSchema
}