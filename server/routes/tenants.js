const express = require('express');
const router = express.Router();

const Tenant = require('../models/Tenant');

router.route('/')
  .get((req, res) => {
    Tenant.find() //  find ALL documents
      .sort('name')
      .then((tenants) => res.send(tenants))
      .catch((err) => res.status(400).send(err));
  })
  .post((req, res) => {
    Tenant.create(req.body)
      .then((tenant) => res.send(tenant))
      .catch((err) => res.status(400).send(err));
  });

router.route('/:id')
  .put((req, res) => {
    Tenant.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((tenant) => {
        res.send(tenant);
      })
      .catch((err) => res.status(400).send(err));
  })
  .delete((req, res) => {
    Tenant.findByIdAndRemove(req.params.id)
      .then((something) => {
        console.log('something: ', something);
        res.send(something);
      })
      .catch((err) => res.status(400).send(err));
  });

module.exports = router;
