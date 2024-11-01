import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICompany, IMedicine } from "../../type/type";

export const medicinApi = createApi({
    reducerPath: 'medicinApi',
    tagTypes: ['MEDICIN'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/medicine' }),
    endpoints: (builder) => ({
        getMedicin: builder.query<IMedicine[], any>({
            query: () => '/',
            providesTags: ['MEDICIN']
        }),
        getMedicinById: builder.query<IMedicine, number>({
            query: (id: number) => '/' + id,
            providesTags: ['MEDICIN']
        }),
        getMedicinBySearch: builder.query<IMedicine, any>({
            query: (text: string) => ({
                url: '/search/by?query=' + text,
                method: "GET"
            }),
            providesTags: ['MEDICIN']
        }),
        getMedicinByFind: builder.query<IMedicine[], {
            priceFilter: number | null,
            countFilter: number | null,
            companyFilter: number | null,
            dateFilter: string,
        }>({
            query: ({ priceFilter, companyFilter, countFilter, dateFilter }: {
                priceFilter: number,
                countFilter: number,
                companyFilter: number,
                dateFilter: string,
            }) => {
                let str = companyFilter ? "companyId=" + companyFilter : "";
                str += priceFilter ? str.length ? "&minPrice=" + priceFilter : "minPrice=" + priceFilter : '';
                str += countFilter ? str.length ? "&minCount=" + countFilter : "minCount=" + countFilter : '';
                str += dateFilter ? str.length ? "&startDate=" + dateFilter : "startDate=" + dateFilter : '';
                return ({
                    url: '/find/by?' + str,
                    method: "GET"
                })
            },
            providesTags: ['MEDICIN']
        }),
        updateMedicin: builder.mutation<IMedicine, Partial<any> & Pick<IMedicine, 'id'>>({
            query: ({ id, ...patch }) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['MEDICIN'],
        }),
        createMedicin: builder.mutation<IMedicine, Partial<any>>({
            query: ({ ...data }) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['MEDICIN'],
            transformResponse: (response: { data: IMedicine }, meta, arg) => response.data,
        }),
        deleteMedicin: builder.mutation<IMedicine, number>({
            query: (id: number) => ({
                url: '/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['MEDICIN']
        })
    })

})
export const {
    useCreateMedicinMutation,
    useDeleteMedicinMutation,
    useGetMedicinByIdQuery,
    useGetMedicinQuery,
    useUpdateMedicinMutation,
    useGetMedicinByFindQuery,
    useGetMedicinBySearchQuery

} = medicinApi