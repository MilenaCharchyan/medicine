import React, { useState } from "react"
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";
import { useGetMedicinByIdQuery, useUpdateMedicinMutation } from "../../features/medicin/medicinAPI";
import { IMedicine } from "../../type/type";
import { useForm } from "react-hook-form";

export const MedicineDetails: React.FC = React.memo((): JSX.Element => {
    const { id } = useParams()
    const { data, error, isLoading } = useGetMedicinByIdQuery(id ? +id : 0)
    console.log(data);


    const [addMedicineModalIsOpen, setAddmedModalIsOpen] = useState(false);
    const closeAddCompanyModal = () => {
        setAddmedModalIsOpen(false);
    };
    console.log(data);


    const { register, handleSubmit, reset, formState: { errors } } = useForm<IMedicine>();
    const [updatemedicine, result] = useUpdateMedicinMutation()

    const handleAddMedicine = async (com: IMedicine) => {
        if(id)
            updatemedicine({...com, id:+id})
        .then(console.log).catch(console.warn)
        reset();
    };

    return(
        <div>
            <h3>MedicineDetails</h3>
            {data ? (
                <>
                    <h2>{data.name}</h2>
                    <p><strong>Description:</strong> {data.description}</p>
                    <p><strong>Price:</strong> {data.price} USD</p>
                    <p><strong>Count:</strong> {data.count}</p>
                    <p><strong>Manufacturing Date:</strong> {new Date(data.date).toLocaleDateString()}</p>
                    <p>Update
                            <button onClick={() => setAddmedModalIsOpen(true)}>Add Medicine</button>

                        </p>
                    {data.company && (
                        <>
                            <h3>Manufactured By</h3>
                            <p><strong>Company:</strong> {data.company.name}</p>
                            <p>{data.company.description}</p> - <Link to={'/company/'+data.company.id}>See More</Link>
                        </>
                    )}
                </>
            ) : (
                <p>Medicine not found.</p>

            )}
            <Modal isOpen={addMedicineModalIsOpen} onRequestClose={closeAddCompanyModal}>
            <h4>Update Medicine</h4>
                <form onSubmit={handleSubmit(handleAddMedicine)} className="medicine-details-container">
                    <input
                        type="text"
                        placeholder="Medicine Name"
                        {...register("name", { required: "Medicine name is required" })}
                        className="input"
                    />
                    {errors.name && <span className="error">{errors.name.message}</span>}

                    <textarea
                        placeholder="Medicine Description"
                        {...register("description", { required: "Medicine description is required" })}
                        className="textarea"
                    />
                    {errors.description && <span className="error">{errors.description.message}</span>}

                    <input
                        type="number"
                        placeholder="Price"
                        {...register("price", { required: "Price is required" })}
                        className="input"
                    />
                    {errors.price && <span className="error">{errors.price.message}</span>}

                    <input
                        type="number"
                        placeholder="Count"
                        {...register("count", { required: "Count is required" })}
                        className="input"
                    />
                    {errors.count && <span className="error">{errors.count.message}</span>}

                    <input
                        type="date"
                        {...register("date", { required: "Manufacturing date is required" })}
                        className="input"
                    />
                    {errors.date && <span className="error">{errors.date.message}</span>}

                    <button type="submit" className="update-medicine-btn">Update Medicine</button>
                </form>
            <button onClick={closeAddCompanyModal} className="cancel-btn">Cancel</button>
        </Modal>


        </div>
    )
})