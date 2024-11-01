import React, { useState } from "react"
import { useGetCompanyByIdQuery, useUpdateCompanyMutation } from "../../features/company/companyAPI"
import { Link, useParams } from "react-router-dom"
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { ICompany } from "../../type/type";

export const CompanyDetails: React.FC = React.memo((): JSX.Element => {
    const [addCompanyModalIsOpen, setAddCompanyModalIsOpen] = useState(false);
    const closeAddCompanyModal = () => {
        setAddCompanyModalIsOpen(false);
    };
    const { id } = useParams()
    const { data, error, isLoading } = useGetCompanyByIdQuery(id ? +id : 0)
    console.log(data);


    const { register, handleSubmit, reset, formState: { errors } } = useForm<ICompany>();
    const [updateCompany, result] = useUpdateCompanyMutation()

    const handleAddCompany = async (com: ICompany) => {
        if(id)
        updateCompany({...com, id:+id})
        // .then(console.log).catch(console.warn)
        reset();
    };

    return (
        <div>
            <h3>CompanyDetails</h3>
            {
                data ?
                    <>
                        <h2>{data.name}</h2>
                        <p>{data.description}</p>
                        <p>Update
                            <button onClick={() => setAddCompanyModalIsOpen(true)}>Add Company</button>

                        </p>
                        <h3>Medicines</h3>
                        {data.medicines.length > 0 ? (
                            <ul>
                                {data.medicines.map((medicine) => (
                                    <li key={medicine.id}>
                                        <strong>{medicine.name}</strong> - {medicine.price} USD - <Link to={'/medicine/' + medicine.id}>See More</Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No medicines found for this company.</p>
                        )}
                    </>
                    :
                    <p>Company not found.</p>
            }

            <Modal isOpen={addCompanyModalIsOpen} onRequestClose={closeAddCompanyModal}>
                <h4>Update Company</h4>
                <form onSubmit={handleSubmit(handleAddCompany)} className="add-company-container">
                    <h4>Add Company</h4>
                    <input
                        type="text"
                        placeholder="Company Name"
                        {...register('name', {required:"enter name"})}
                        className="input"
                    />
                    {errors.name && <span className="error">{errors.name.message}</span>}

                    <textarea
                        placeholder="Company Description"
                        {...register('description', {required:"enter desc"})}
                        className="textarea"
                    />
                    {errors.description && <span className="error">{errors.description.message}</span>}

                    <button type="submit" className="add-company-btn">Add Company</button>
                </form>

                <button onClick={closeAddCompanyModal}>Cancel</button>
            </Modal>

        </div>
    )
})