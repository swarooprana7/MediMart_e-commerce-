import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User', 'Product', 'Order'],
  endpoints: builder => ({})
});


// export const getCSRFToken = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/v1/user/get-csrf-token`);
//     console.log(response.data.csrfToken)
//     return response.data.csrfToken;
//   } catch (error) {
//     console.log(error);
//   }
// }