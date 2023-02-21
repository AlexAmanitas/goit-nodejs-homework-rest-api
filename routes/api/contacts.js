const express = require('express');

const router = express.Router();

const { validateBody } = require('../../middlewares');

const {
  contactPostShema,
  contactPutShema,
  contactPatchShema,
} = require('../../schemas/contacts');

const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatus,
} = require('../../controllers/contacts');

router.get('/', getAll);

router.get('/:contactId', getById);

router.post('/', validateBody(contactPostShema), add);

router.delete('/:contactId', deleteById);

router.put('/:contactId', validateBody(contactPutShema), updateById);

router.patch(
  '/:contactId/favorite',
  validateBody(contactPatchShema),
  updateStatus
);

module.exports = router;
