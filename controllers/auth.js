const User = require('../models/user');
const { HttpError, ctrlWrapper } = require('../helpers');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email in use');
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashPassword,
    subscription: 'starter',
  });
  res.status(201).json({
    user: {
      email,
      subscription: 'starter',
    },
  });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2d' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
      subscription: 'starter',
    },
  });
};

const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};
const getCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateUserStatus = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, { subscription });
  res.status(200).json({
    data: { user },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  logOut: ctrlWrapper(logOut),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserStatus: ctrlWrapper(updateUserStatus),
};
