const { MedicineController } = require('../controller/MedicineControlle');

const med = require('express').Router();

med.get('/', MedicineController.getAllMedicines); 
med.get('/:id', MedicineController.getMedicineById); 
med.post('', MedicineController.createMedicine); 
med.delete('/:id', MedicineController.deleteMedicineById);
med.patch('/:id', MedicineController.updateMedicineById); 
med.get('/search/by', MedicineController.searchMedicines);
med.get('/find/by', MedicineController.filterMedicines);

module.exports = { med };