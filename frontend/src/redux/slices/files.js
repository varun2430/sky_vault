import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  files: null,
  filesSize: 0,
  filesCount: 0,
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload.files;
      state.filesSize = state.files.reduce((accumulator, obj) => {
        return accumulator + obj.size;
      }, 0);
      state.filesCount = state.files.length;
    },
  },
});

export const { setFiles } = filesSlice.actions;
export default filesSlice.reducer;
