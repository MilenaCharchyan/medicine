import React, { useState } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import {  ICompany } from "../../type/type"; // Assuming you have a type defined for Company
import { useCreateCompanyMutation } from "../../features/company/companyAPI";

const validationSchema = Yup.object({
    name: Yup.string().required('Company name is required'),
    description: Yup.string().max(200, 'Description must be at most 200 characters long').required("Company description is required"),
});

export const AddCompany: React.FC = React.memo((): JSX.Element => {
    const { register, handleSubmit, reset, formState:{errors} } = useForm<ICompany>();
    const [createCompany, result] = useCreateCompanyMutation()

    const handleAddCompany = async (data: ICompany) => {
        try {
            await validationSchema.validate(data, { abortEarly: false });
            createCompany(data)
            // .then(console.log).catch(console.warn)
            reset();
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const newErrors: { name?: string; description?: string } = {};
                err.inner.forEach((error) => {
                    if (error.path === 'name') newErrors.name = error.message;
                    if (error.path === 'description') newErrors.description = error.message;
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(handleAddCompany)} className="add-company-container">
            <h4>Add Company</h4>
            <input
                type="text"
                placeholder="Company Name"
                {...register('name')}
                className="input"
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
            
            <textarea
                placeholder="Company Description"
                {...register('description')}
                className="textarea"
            />
            {errors.description && <span className="error">{errors.description.message}</span>}
            
            <button type="submit" className="add-company-btn">Add Company</button>
        </form>
    );
});
