const guestModel = require('../models/guests');

module.exports = {
  getById(req, res, next) {
    guestModel.findById(req.params.guestId, (err, guestInfo) => {
      if (err) {
        next(err);
      }
      else {
        res.json({ status: 'success', message: 'guest found!!!', data: { guests: guestInfo } });
      }
    });
  },

  getAll(req, res, next) {
    guestModel.find({}, (err, guests) => {
      if (err) {
        next(err);
      }
      else {
        res.json({ status: 'success', message: 'guests list found!!!', data: { guests } });
      }
    });
  },

  updateById(req, res, next) {
    guestModel.findByIdAndUpdate(req.params.guestId, { name: req.body.name }, (err, guestInfo) => {
      if (err) next(err);
      else {
        res.json({ status: 'success', message: 'guest updated successfully!!!', data: guestInfo });
      }
    });
  },

  deleteById(req, res, next) {
    guestModel.findByIdAndRemove(req.params.guestId, (err, guestInfo) => {
      if (err) next(err);
      else {
        res.json({ status: 'success', message: 'guest deleted successfully!!!', data: guestInfo });
      }
    });
  },

  create(req, res, next) {
    guestModel.find({ documentId: req.body.documentId }, (err, guests) => {
      if (err) {
        next(err);
        return;
      }
      if (guests && guests.find(guest => guest.documentType === req.body.documentType)) {
        const responseError = new Error(`guest with ${req.body.documentType} id "${req.body.documentId}" is already checked in`);
        responseError.status = 409;
        next(responseError);
        return;
      }
      guestModel.create(req.body, (createErr, result) => {
        if (createErr) next(createErr);
        else res.json({ status: 'success', message: 'guest added successfully!!!', data: result });
      });
    });
  },
};
