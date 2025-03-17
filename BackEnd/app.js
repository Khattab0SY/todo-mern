require("dotenv").config()

//! Variables
const express = require("express")
const todoPath = require("./routes/todo")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

//! middlewares
const logger = require("./middlewares/logger")
const error = require("./middlewares/error")
const notFound = require("./middlewares/notFound")


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DataBase is connected"))
    .catch(err => console.log(err))

app.use(express.json())
app.use(cors())
app.use(logger)
app.use("/api/todo", todoPath)
app.use(notFound)
app.use(error)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server Runing on\nhttp://localhost:${PORT}`))