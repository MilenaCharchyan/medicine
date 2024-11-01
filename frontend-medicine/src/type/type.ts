
export interface ICompany {
    id: number;
    name: string;
    description: string;
    medicines:IMedicine[]
}


export interface IMedicine {
    id: number;
    name: string;
    description: string;
    price: number;
    count: number;
    companyId: number; 
    date: string; 
    company:ICompany
}