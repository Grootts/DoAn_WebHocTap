import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  id: "",
  isRole: "",
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = "", email = "", _id = "", isRole = "" } = action.payload;
      state.name = name ? name : state.name;
      state.email = email ? email : state.email;
      state.id = _id ? _id : state.id;
      state.isRole = isRole ? isRole : state.isRole;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.id = "";
      state.isRole = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
