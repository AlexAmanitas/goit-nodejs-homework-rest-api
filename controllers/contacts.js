const { HttpError, ctrlWrapper } = require('../helpers');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../models/contacts');

const { v4 } = require('uuid');

const getAll = async (req, res, next) => {
  const { favorite = null } = req.query;
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  console.log(page, limit, favorite);
  const skip = (page - 1) * limit;
  const contacts = !favorite
    ? await listContacts({ owner: _id }, { skip, limit: +limit })
    : await listContacts({ owner: _id, favorite }, { skip, limit: +limit });
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: contacts },
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: contact },
  });
};

const add = async (req, res, next) => {
  const { _id } = req.user;
  const result = await addContact({ ...req.body, owner: _id });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'missing fields');
  }
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: contact,
  });
};

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'missing fields favorite');
  }
  const result = await updateStatusContact(contactId, req.body);
  console.log(req.body, result);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatus: ctrlWrapper(updateStatus),
};
