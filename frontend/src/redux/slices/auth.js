import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  encryption_key: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.encryption_key = action.payload.encryption_key;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.encryption_key = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
