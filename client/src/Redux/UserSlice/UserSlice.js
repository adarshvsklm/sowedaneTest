import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: false,
};

export const UserSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      console.log(action);
      state.name = action.payload.name || state.name;
      state.email = action.payload.email || state.email;
    },
  },
});

export default UserSlice.reducer;
export const { setUserDetails } = UserSlice.actions;
