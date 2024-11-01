import React, { useEffect, useMemo, useState } from "react";
import { IMedicine } from "../../type/type";
import { Link } from "react-router-dom";
import { useGetMedicinByFindQuery, useGetMedicinQuery } from "../../features/medicin/medicinAPI";
import { useGetCompanyQuery } from "../../features/company/companyAPI";

export const Medicine: React.FC = React.memo((): JSX.Element => {
    // const { data, error, isLoading } = useGetMedicinQuery('');
    const company = useGetCompanyQuery('');
    console.log(company.data);

    const [priceFilter, setPriceFilter] = useState<number | null>(null);
    const [countFilter, setCountFilter] = useState<number | null>(null);
    const [companyFilter, setCompanyFilter] = useState<number | null>(null);
    const [dateFilter, setDateFilter] = useState('');
    const { data, error, isLoading, refetch } = useGetMedicinByFindQuery({
        priceFilter,
        countFilter,
        companyFilter,
        dateFilter,
    });

    console.log(data, isLoading);
    useEffect(() => {
        refetch()
    }, [priceFilter, countFilter, companyFilter, dateFilter])


    return (
        <div>
            <h3>Medicine</h3>

            <div className="filters">


                <input
                    type="number"
                    placeholder="Min Price"
                    value={priceFilter !== null ? priceFilter : ''}
                    onChange={(e) => setPriceFilter(e.target.value ? parseFloat(e.target.value) : null)}
                    className="input"
                />

                <input
                    type="number"
                    placeholder="Min Count"
                    value={countFilter !== null ? countFilter : ''}
                    onChange={(e) => setCountFilter(e.target.value ? parseInt(e.target.value, 10) : null)}
                    className="input"
                />


                <select value={companyFilter || ""} onChange={(e) => setCompanyFilter(+e.target.value)}>
                    <option value="" hidden> ...</option>
                    {
                        company.data?.map((elm) => {
                            return (
                                <option key={elm.id} value={elm.id}>{elm.name}</option>
                            )
                        })
                    }
                </select>

                <input
                    type="date"
                    placeholder="Manufacturing Date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="input"
                />
            </div>
            <hr />
            {isLoading && <p>Loading medicines...</p>}
            {error && <p>Failed to load medicines.</p>}
            {data && data?.map((medicine: IMedicine) => (
                <div key={medicine.id}>
                    <p>{medicine.name}</p>
                    <p>Price: ${medicine.price}</p>
                    <p>date: {medicine.date}</p>
                    <p>count: {medicine.count}</p>
                    <Link to={'/medicine/' + medicine.id}>See More</Link>
                </div>

            ))}

            <hr />


        </div>
    );
});
