import React, { useState } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { IMedicine } from "../../type/type"; // Assuming you have a type defined for Medicine
import { useCreateMedicinMutation } from "../../features/medicin/medicinAPI";
import { useGetCompanyByIdQuery, useGetCompanyQuery } from "../../features/company/companyAPI";

const validationSchema = Yup.object({
    name: Yup.string().required('Medicine name is required'),
    description: Yup.string().max(200, 'Description must be at most 200 characters long').required("Medicine description is required"),
    price: Yup.number().required('Price is required').min(0, 'Price must be a positive number'),
    count: Yup.number().required('Count is required').min(0, 'Count must be a positive number'),
    date: Yup.date().required('Manufacturing date is required'),
});

export const AddMedicine: React.FC = React.memo((): JSX.Element => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IMedicine>();
    const [createMedicine, result] = useCreateMedicinMutation();
    const { data, error, isLoading } = useGetCompanyQuery('')

    const handleAddMedicine = async (data: IMedicine) => {
        try {
            await validationSchema.validate(data, { abortEarly: false });
            createMedicine(data)
            .then(res=>{

                console.log(res);
            })
            
            reset();
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error) => {
                    console.warn(error.message);
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(handleAddMedicine)} className="add-medicine-container">
            <h4>Add Medicine</h4>
            <input
                type="text"
                placeholder="Medicine Name"
                {...register('name')}
                className="input"
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
            
            <textarea
                placeholder="Medicine Description"
                {...register('description')}
                className="textarea"
            />
            {errors.description && <span className="error">{errors.description.message}</span>}

            <input
                type="number"
                placeholder="Price"
                {...register('price')}
                className="input"
            />
            {errors.price && <span className="error">{errors.price.message}</span>}

            <input
                type="number"
                placeholder="Count"
                {...register('count')}
                className="input"
            />
            {errors.count && <span className="error">{errors.count.message}</span>}

            <input
                type="date"
                placeholder="Manufacturing Date"
                {...register('date')}
                className="input"
            />
            {errors.date && <span className="error">{errors.date.message}</span>}
            
            <select
                {...register('companyId')}
                className="input"
                defaultValue=""
            >
                <option value="" disabled>Select Company</option>
                    <option>Loading data...</option>
                {
                    data?.map((company) => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                    ))
                }
            </select>

            <button type="submit" className="add-medicine-btn">Add Medicine</button>
        </form>
    );
});
