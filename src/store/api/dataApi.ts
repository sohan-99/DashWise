import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the data type (you can adjust this based on your actual data structure)
export interface DataItem {
  date: string;
  sales: number;
  [key: string]: string | number | boolean;
}

// Define the API slice
export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Data'],
  endpoints: (builder) => ({
    getData: builder.query<DataItem[], void>({
      query: () => 'data.json',
      providesTags: ['Data'],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetDataQuery } = dataApi;
