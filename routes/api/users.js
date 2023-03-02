const express = require('express');

const router = express.Router();

const { auth, validateBody } = require('../../middlewares');

const { userSchema, userStatusSchema } = require('../../schemas/users');

const {
  register,
  logIn,
  logOut,
  getCurrentUser,
  updateUserStatus,
} = require('../../controllers/auth');

router.post('/signup', validateBody(userSchema), register);

router.post('/login', validateBody(userSchema), logIn);

router.get('/logout', auth, logOut);

router.get('/current', auth, getCurrentUser);

router.patch('/', auth, validateBody(userStatusSchema), updateUserStatus);

module.exports = router;
