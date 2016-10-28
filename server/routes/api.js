const express = require('express');
const router = express.Router();

router.use('/tenants', require('./tenants'));
router.use('/properties', require('./properties'));

module.exports = router;
