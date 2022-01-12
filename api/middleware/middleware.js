const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const current_datetime = new Date();
  const method = req.method;
  const url = req.url;
  const log = `[${current_datetime}] ${method}:${url}`;
  console.log(log);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({ message: "user not found" })
    } else {
      req.user = user
      next()
    }
  } catch {
    res.status(500).json({
      message: "problem finding user"
    })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = 
  logger,
  validateUserId
