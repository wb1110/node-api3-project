const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const {logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware');
const { json } = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', logger, (req, res) => {
  //RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.json(err)
  })
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  Users.getById(req.params.id)
  .then(userId => {
    res.json(userId)
  })
  .catch(next)
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  Users.insert(req.body)
  .then(newUser => {
    res.json(newUser)
  })
  .catch(next)
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  Users.update(req.params.id, req.body)
  .then(updatedUser => {
    res.json(updatedUser)
  })
  .catch(next)
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  try {
    await Users.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  Users.getUserPosts(req.params.id)
  .then( userPosts => {
    res.json(userPosts)
  })
  .catch(next)
  // this needs a middleware to verify user id
});

router.post(
  '/:id/posts', 
  validateUserId, 
  validatePost, 
  async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  try {
    const result = await Posts.insert({
      user_id: req.params.id,
      text: req.text,
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something tragic inside posts router happened',
    message: err.message,
    stack: err.stack,
  })
})

// do not forget to export the router
module.exports = router