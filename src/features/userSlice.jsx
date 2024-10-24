import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  refresh_token: null,
  data_user: null,
};

const userSlice = createSlice({
  name: "data_user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refresh_token = action.payload;
    },
    setDataUser: (state, action) => {
      state.data_user = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken, setDataUser } =
  userSlice.actions;
export default userSlice.reducer;
