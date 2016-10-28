const mongoose = require('mongoose');
let Tenant;

const tenantSchema = new mongoose.Schema({
  name: { type: String, minLength: 1 },
  age: { type: Number, min: 1, max: 120 },
  email: { type: String },
  phone: { type: Number, minLength: 10 },
  rented: { type: Boolean, default: false }
});

Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
