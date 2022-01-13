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

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  try {
    const name = await req.body.name
    if (!name) {
      res.status(400).json({ message: "missing required name field" })
    } else {
      next()
    }
  } catch {
    res.status(500).json({
      message: "problem adding user"
    })
  }
}

async function validatePost(req, res, next) {
  // DO YOUR MAGIC
    const text = await req.body.text
    if (!text || !text.trim()) {
      res.status(400).json({ message: "missing required text field" })
    } else {
      req.text = text.trim()
      next()
    }
  } 


// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};