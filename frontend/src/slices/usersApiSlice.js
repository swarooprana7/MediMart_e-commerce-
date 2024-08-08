// import { USERS_URL } from '../constants';
// import { apiSlice } from './apiSlice';

// export const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: builder => ({
//     login: builder.mutation({
//       query: ( data ) => ({
//         url: `${USERS_URL}/login`,
//         method: 'POST',
//         body: data,
//         headers: {
//           'X-CSRF-Token': data.csrfToken, // Send CSRF token in headers
//         },
//         withCredentials: true, // Ensure cookies are sent with the request
//       }),
//       invalidatesTags: ['User']
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/logout`,
//         method: 'POST'
//       }),
//       invalidatesTags: ['User']
//     }),
//     register: builder.mutation({
//       query: ( data ) => ({
//         url: `${USERS_URL}`,
//         method: 'POST',
//         body: data,
//         headers: {
//           'X-CSRF-Token': data.csrfToken, // Send CSRF token in headers
//         },
//         withCredentials: true, // Ensure cookies are sent with the request
//       }),
//       invalidatesTags: ['User']
//     }),
//     newPasswordRequest: builder.mutation({
//       query: data => ({
//         url: `${USERS_URL}/reset-password/request`,
//         method: 'POST',
//         body: data
//       }),
//       invalidatesTags: ['User']
//     }),
//     resetPassword: builder.mutation({
//       query: ({ userId, token, password }) => ({
//         url: `${USERS_URL}/reset-password/reset/${userId}/${token}`,
//         method: 'POST',
//         body: { password }
//       }),
//       invalidatesTags: ['User']
//     }),
//     profile: builder.mutation({
//       query: data => ({
//         url: `${USERS_URL}/profile`,
//         method: 'PUT',
//         body: data
//       }),
//       invalidatesTags: ['User']
//     }),
//     getUserProfile: builder.query({
//       query: async () => ({
//         url: `${USERS_URL}/profile`
//       }),
//       providesTags: ['User']
//     }),
//     getUsers: builder.query({
//       query: () => ({
//         url: USERS_URL
//       }),
//       providesTags: ['User']
//     }),
//     admins: builder.query({
//       query: () => ({
//         url: `${USERS_URL}/admins`
//       }),
//       providesTags: ['User']
//     }),
//     getUserById: builder.query({
//       query: userId => ({
//         url: `${USERS_URL}/${userId}`
//       }),
//       providesTags: ['User']
//     }),
//     deleteUser: builder.mutation({
//       query: userId => ({
//         url: `${USERS_URL}/${userId}`,
//         method: 'DELETE'
//       }),
//       invalidatesTags: ['User']
//     }),
//     updateUser: builder.mutation({
//       query: ({ userId, ...userData }) => ({
//         url: `${USERS_URL}/${userId}`,
//         method: 'PUT',
//         body: { ...userData }
//       }),
//       invalidatesTags: ['User']
//     })
//   })
// });

// export const {
//   useLoginMutation,
//   useLogoutMutation,
//   useRegisterMutation,
//   useNewPasswordRequestMutation,
//   useResetPasswordMutation,
//   useProfileMutation,
//   useGetUserProfileQuery,
//   useGetUsersQuery,
//   useDeleteUserMutation,
//   useUpdateUserMutation,
//   useGetUserByIdQuery,
//   useAdminsQuery
// } = usersApiSlice;



import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (data) => {
        console.log('Login data:', data); // Log login data
        return {
          url: `${USERS_URL}/login`,
          method: 'POST',
          body: data,
          headers: {
            'X-CSRF-Token': data.csrfToken, // Send CSRF token in headers
          },
          withCredentials: true, // Ensure cookies are sent with the request
        };
      },
      invalidatesTags: ['User']
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      }),
      invalidatesTags: ['User']
    }),
    register: builder.mutation({
      query: (data) => {
        console.log('Registration data:', data); // Log registration data
        return {
          url: `${USERS_URL}`,
          method: 'POST',
          body: data,
          headers: {
            'X-CSRF-Token': data.csrfToken, // Send CSRF token in headers
          },
          withCredentials: true, // Ensure cookies are sent with the request
        };
      },
      invalidatesTags: ['User']
    }),
    newPasswordRequest: builder.mutation({
      query: data => {
        console.log('New password request data:', data); // Log password request data
        return {
          url: `${USERS_URL}/reset-password/request`,
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['User']
    }),
    resetPassword: builder.mutation({
      query: ({ userId, token, password }) => {
        console.log('Reset password data:', { userId, token, password }); // Log reset password data
        return {
          url: `${USERS_URL}/reset-password/reset/${userId}/${token}`,
          method: 'POST',
          body: { password }
        };
      },
      invalidatesTags: ['User']
    }),
    profile: builder.mutation({
      query: data => {
        console.log('Profile update data:', data); // Log profile update data
        return {
          url: `${USERS_URL}/profile`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['User']
    }),
    getUserProfile: builder.query({
      query: async () => ({
        url: `${USERS_URL}/profile`
      }),
      providesTags: ['User']
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL
      }),
      providesTags: ['User']
    }),
    admins: builder.query({
      query: () => ({
        url: `${USERS_URL}/admins`
      }),
      providesTags: ['User']
    }),
    getUserById: builder.query({
      query: userId => ({
        url: `${USERS_URL}/${userId}`
      }),
      providesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: userId => {
        console.log('Delete user data:', userId); // Log delete user data
        return {
          url: `${USERS_URL}/${userId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...userData }) => {
        console.log('Update user data:', { userId, ...userData }); // Log update user data
        return {
          url: `${USERS_URL}/${userId}`,
          method: 'PUT',
          body: { ...userData }
        };
      },
      invalidatesTags: ['User']
    })
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useNewPasswordRequestMutation,
  useResetPasswordMutation,
  useProfileMutation,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useAdminsQuery
} = usersApiSlice;
