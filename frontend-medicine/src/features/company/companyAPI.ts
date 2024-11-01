import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICompany } from '../../type/type'
import { response } from 'express'

export const companyApi = createApi({
  reducerPath: 'companyApi',
  tagTypes:['COMPANY'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/company' }),
  endpoints: (builder) => ({
    getCompany: builder.query<ICompany[], string>({
      query: () => `/`,
      providesTags:['COMPANY']
    }),
    getCompanyById:builder.query<ICompany,number>({
        query:(id:number)=>'/'+id,
        providesTags:['COMPANY']

    }),
    updateCompany: builder.mutation<ICompany, Partial<any> & Pick<ICompany, 'id'>>({
        query: ({ id, ...patch }) => ({
          url: `/${id}`,
          method: 'PATCH',
          body: patch,
        }),
        invalidatesTags:['COMPANY'],
        transformResponse: (response: { data: ICompany }, meta, arg) => response.data,
    }),
    createCompany:builder.mutation<ICompany,Partial<any>>({
        query:({...data})=>({
            url:'/',
            method:'POST',
            body:data
        }),
        invalidatesTags:['COMPANY'],
        transformResponse:(response:{data:ICompany},meta,arg)=>response.data,
    }),
    deleteCompany:builder.mutation<ICompany,number>({
        query:(id:number)=>({
            url:'/'+id,
            method:'DELETE',
        }),
        invalidatesTags:['COMPANY']
    })

  }),
})


export const { 
    useGetCompanyQuery,
    useCreateCompanyMutation,
    useDeleteCompanyMutation,
    useGetCompanyByIdQuery,
    useUpdateCompanyMutation
 } = companyApi