const { Company, Medicine } = require("../model");
const { schemaCompany, schemaCompanyUpdate } = require("../schema");

class MainController {
    static async getAllCompanies(req, res) {
        const companies = await Company.findAll();
        res.send(companies);
    }

    static async getCompanyById(req, res) {
        const { id } = req.params;
        const company = await Company.findOne({
            where:{id},
            include:[{
                model:Medicine,
                as:"medicines"
            }]
        });
        if (company) {
            res.send(company);
        } else {
            res.send({ message: 'Company not found' });
        }
    }

    static async createCompany(req, res) {
        console.log(req.body);
        
        const { error, value } = schemaCompany.validate(req.body);
        if (error) {
            res.send(error.details[0].message);
        } else {
            const company = await Company.create(req.body);
            console.log(company);
            
            res.send(company);
        }
    }

    static async deleteCompanyById(req, res) {
        const { id } = req.params;
        const company = await Company.findByPk(id);
        if (company) {
            await Company.destroy({
                where: {
                    id
                }
            });
            res.send(true);
        } else {
            res.send({ message: 'Company not found' });
        }
    }

    static async updateCompanyById(req, res) {
        const { id } = req.params;
        console.log(id);
        
        const company = await Company.findByPk(id);
        if (company) {
            const { error, value } = schemaCompanyUpdate.validate(req.body);
            if (error) {
                res.send(error.details[0].message);
            } else {
                await Company.update(req.body, {
                    where: {
                        id
                    }
                });
                res.send(await Company.findByPk(id));
            }
        } else {
            res.send({ message: 'Company not found' });
        }
    }
}

module.exports = { MainController };
