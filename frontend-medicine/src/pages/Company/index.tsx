import React from "react"
import { useGetCompanyQuery } from "../../features/company/companyAPI";
import { ICompany } from "../../type/type";
import { Link } from "react-router-dom";

export const Company: React.FC = React.memo((): JSX.Element => {
    const { data, error, isLoading } = useGetCompanyQuery('')
    console.log(data, isLoading);

    return (
        <div>
            <h3>Company</h3>
            {data && data?.map((elm:ICompany)=>{
                return(
                    <div key={elm.id}>
                        <p>{elm.name}</p>
                        <Link to={'/company/'+elm.id}>See More</Link>
                        
                    </div>
                )
            })}


        </div>
    )
})