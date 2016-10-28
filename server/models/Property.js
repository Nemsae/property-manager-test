const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  address: { type: String, require: true },
  bedrooms: { type: Number, min: 1 },
  bathrooms: { type: Number, min: 1 },
  baseRent: { type: Number, min: 200 },
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }]
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
