const { HttpError, ctrlWrapper } = require('../helpers');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const { v4 } = require('uuid');

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  console.log('object');
  try {
    // const { error } = contactPostShema.validate(req.body);
    // if (error) {
    //   throw HttpError(400, 'missing required name field');
    // }
    const result = await addContact({ id: v4(), ...req.body });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, 'missing fields');
    }
    // const { error } = contactPutShema.validate(req.body);
    // console.log(error);
    // if (error) {
    //   throw HttpError(400, 'extra field found');
    // }
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json({
      status: 'success',
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
