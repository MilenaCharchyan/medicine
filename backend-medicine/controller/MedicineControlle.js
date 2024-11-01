const { Op } = require("sequelize");
const { Medicine, Company } = require("../model");
const { schemaMedicine, schemaMedicineUpdate } = require("../schema");

class MedicineController {
    static async getAllMedicines(req, res) {
        const medicines = await Medicine.findAll({ include: 'company' });
        res.send(medicines);
    }

    static async getMedicineById(req, res) {
        const { id } = req.params;
        const medicine = await Medicine.findByPk(id, { include: 'company' });
        if (medicine) {
            res.send(medicine);
        } else {
            res.send({ message: 'Medicine not found' });
        }
    }

    static async createMedicine(req, res) {
        const { error, value } = schemaMedicine.validate(req.body);
        if (error) {
            res.send(error.details[0].message);
        } else {
            // Check if the company exists
            const companyExists = await Company.findByPk(req.body.companyId);
            if (!companyExists) {
                return res.send({ message: 'Company not found' });
            }
            const medicine = await Medicine.create(req.body);
            res.send(medicine);
        }
    }

    static async deleteMedicineById(req, res) {
        const { id } = req.params;
        const medicine = await Medicine.findByPk(id);
        if (medicine) {
            await Medicine.destroy({
                where: {
                    id
                }
            });
            res.send(true);
        } else {
            res.send({ message: 'Medicine not found' });
        }
    }

    static async updateMedicineById(req, res) {
        const { id } = req.params;
        const medicine = await Medicine.findByPk(id);
        if (medicine) {
            const { error, value } = schemaMedicineUpdate.validate(req.body);
            if (error) {
                res.send(error.details[0].message);
            } else {
                // Check if the company exists
                if (req.body.companyId) {
                    const companyExists = await Company.findByPk(req.body.companyId);
                    if (!companyExists) {
                        return res.send({ message: 'Company not found' });
                    }
                }
                await Medicine.update(req.body, {
                    where: {
                        id
                    }
                });
                res.send(true);
            }
        } else {
            res.send({ message: 'Medicine not found' });
        }
    }
    static async searchMedicines(req, res) {
        const { query } = req.query; 
        console.log(query);
        
        if (!query) {
            return res.status(400).send({ message: 'Search query is required' });
        }

        try {
            const medicines = await Medicine.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { description: { [Op.like]: `%${query}%` } }
                    ]
                },
                include: 'company' 
            });

            if (medicines.length > 0) {
                res.send(medicines);
            } else {
                res.send({ message: 'No medicines found matching the search criteria' });
            }
        } catch (error) {
            res.status(500).send({ message: 'An error occurred while searching for medicines' });
        }
    }
    static async filterMedicines(req, res) {
        const { 
            minPrice, 
            maxPrice, 
            minCount, 
            maxCount, 
            companyId, 
            startDate, 
            endDate 
        } = req.query;

        try {
            const filterConditions = {};
            if (minPrice) {
                filterConditions.price = { [Op.gte]: parseFloat(minPrice) };
            }
            if (maxPrice) {
                filterConditions.price = {
                    ...filterConditions.price,
                    [Op.lte]: parseFloat(maxPrice)
                };
            }
            if (minCount) {
                filterConditions.count = { [Op.gte]: parseInt(minCount) };
            }
            if (maxCount) {
                filterConditions.count = {
                    ...filterConditions.count,
                    [Op.lte]: parseInt(maxCount)
                };
            }
            if (companyId) {
                filterConditions.companyId = companyId;
            }
            if (startDate) {
                filterConditions.date = { [Op.gte]: new Date(startDate) };
            }
            if (endDate) {
                filterConditions.date = {
                    ...filterConditions.date,
                    [Op.lte]: new Date(endDate)
                };
            }
            const medicines = await Medicine.findAll({
                where: filterConditions,
                include: 'company' // Include related company data
            });
            res.send(medicines);
        } catch (error) {
            res.status(500).send({ message: 'An error occurred while filtering medicines' });
        }
    }

    
}

module.exports = { MedicineController };
