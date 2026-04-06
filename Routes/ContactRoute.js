const express = require("express");
const router = express.Router();

const { ContactController } = require('../Controllers');
const { Auth } = require('../app/Middlewares');
const { ContactValidator } = require('../app/Validators');
const { validate } = require('../app/Middlewares');

//
router.post('/', ContactValidator.createContactValidation, validate, ContactController.Create);
//
router.get('/', Auth.checkAuth, ContactController.All);
router.get('/:id', Auth.checkAuth, ContactController.Show);
router.put('/:id', Auth.checkAuth, ContactValidator.updateContactValidation, validate, ContactController.Update);
router.delete('/:id', Auth.checkAuth, ContactController.Delete);


module.exports = router;