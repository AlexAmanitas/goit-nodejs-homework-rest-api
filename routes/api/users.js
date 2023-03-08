const express = require('express');

const router = express.Router();

const { auth, validateBody, upload } = require('../../middlewares');

const { userSchema, userStatusSchema } = require('../../schemas/users');

const {
  register,
  logIn,
  logOut,
  getCurrentUser,
  updateUserStatus,
  updateAvatar,
} = require('../../controllers/auth');

router.post('/signup', validateBody(userSchema), register);

router.post('/login', validateBody(userSchema), logIn);

router.get('/logout', auth, logOut);

router.get('/current', auth, getCurrentUser);

router.patch('/', auth, validateBody(userStatusSchema), updateUserStatus);

router.patch('/avatar', auth, upload.single('avatar'), updateAvatar);

module.exports = router;
