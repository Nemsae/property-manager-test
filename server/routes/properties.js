const express = require('express');
const router = express.Router();

const Property = require('../models/Property');

router.route('/')
  .get((req, res) => {
    Property.find() //  find ALL documents
      .sort('address')
      .then((properties) => res.send(properties))
      .catch((err) => res.status(400).send(err));
  })
  .post((req, res) => {
    Property.create(req.body)
      .then((property) => res.send(property))
      .catch((err) => res.status(400).send(err));
  });

//  find property of the Tenant
router.route('/findTenant/:id')
  .get((req, res) => {
    let { id } = req.params;
    console.log('id: ', id);
    Property.find({ tenants: id })
      .then((property) => res.send(property))
      .catch((err) => res.status(400).send(err));
  });

//  get one property and populate
router.route('/:id')
  .get((req, res) => {
    Property.findById(req.params.id)
      .populate('tenants')
      .then((property) => res.send(property))
      .catch((err) => res.status(400).send(err));
  })
  .delete((req, res) => {
    Property.findByIdAndRemove(req.params.id)
      .then((deletedProperty) => {
        res.send(deletedProperty);
      })
      .catch((err) => res.status(400).send(err));
  })
  .put((req, res) => {
    Property.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((property) => {
        res.send(property);
      })
      .catch((err) => res.status(400).send(err));
  });

router.put('/:propertyId/addTenant/:tenantId', (req, res) => {
  let { propertyId, tenantId } = req.params;

  Property.findById(propertyId)
    .then((property) => {
      property.tenants.push(tenantId);
      return property.save();  // async that returns promise
    })
    .then((savedProperty) => {
      res.send(savedProperty);
    })
    .catch((err) => res.status(400).send(err));
});

router.put('/:propertyId/removeTenant/:tenantId', (req, res) => {
  let { propertyId, tenantId } = req.params;

  Property.findById(propertyId)
    .then((property) => {
      console.log('property1: ', property);
      let property2 = property.tenants.filter((id) => {
        if (id != tenantId) {
          console.log('sanity');
          return id;
        } else {
          return;
        }
      });
      property.tenants = property2;
      console.log('property2: ', property2);
      return property.save();  // async that returns promise
    })
    .then((savedProperty) => {
      console.log('savedProperty: ', savedProperty);
      res.send(savedProperty);
    })
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
