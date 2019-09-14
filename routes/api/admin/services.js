const express = require('express');
const router = express.Router();

const category = require('../../../controllers/admin/categoryController');
const location = require('../../../controllers/admin/locationController');
const users = require('../../../controllers/admin/usersController');

const auth = require('../../../middleware/auth');

// category api
router.get('/category', auth, category.get);
router.get('/category/:id', auth, category.getById);
router.post('/category', auth, category.post);
router.put('/category/:id', auth, category.put);
router.delete('/category/:id', auth, category._delete);

// location api
router.get('/location', auth, location.findAllLocation);
router.get('/location/:id', auth, location.getLocation);
router.put('/location/:id', auth, location.updateLocation);
router.delete('/location/:id', auth, location.deleteLocation);
router.post('/location', auth, location.createLocation);

router.post('/categorylocations', auth, location.getLocationsOfCategory);
router.post('/hideCategory', auth, category.deactivateCategory);

router.get('/users', auth, users.getUsers);
router.get('/admins', auth, users.getAdmins);
router.delete('/admins/:adminId', auth, users.deleteAdmin);

module.exports = router;
