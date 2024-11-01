import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Company } from "../pages/Company";
import { AddCompany } from "../pages/AddCompany";
import { CompanyDetails } from "../pages/CompanyDetails";
import { Medicine } from "../pages/Medicine";
import { AddMedicine } from "../pages/AddMedicine";
import { MedicineDetails } from "../pages/MedicineDetails";
import { MyError } from "../pages/MyError";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Medicine />,
            },
            {
                path: "add-company",
                element: <AddCompany />,
            },
            {
                path: "company/:id",
                element: <CompanyDetails />,
            },
            {
                path: "companies",
                element: <Company />,
            },
            {
                path: "add-medicine",
                element: <AddMedicine />,
            },
            {
                path: "medicine/:id",
                element: <MedicineDetails />,
            },
            {
                path: "*",
                element: <MyError />,
            },
        ],
    },
]);
