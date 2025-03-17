const logger = (req, res, next) => {
  console.log(`Method: ${req.method}\nURI: ${req.protocol}://${req.get("host")}${req.originalUrl}`)
    next()
}
module.exports = logger