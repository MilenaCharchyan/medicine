const { MainController } = require('../controller/MainController');
const router = require('express').Router();

router.get('/', MainController.getAllCompanies); 
router.get('/:id', MainController.getCompanyById); 
router.post('/', MainController.createCompany); 
router.delete('/:id', MainController.deleteCompanyById); 
router.patch('/:id', MainController.updateCompanyById); 

module.exports = { router };