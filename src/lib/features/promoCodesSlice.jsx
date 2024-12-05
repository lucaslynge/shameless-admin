import { createSlice } from "@reduxjs/toolkit";

export const promocodeSlice = createSlice({
  name: "promoCodes",
  initialState: {
    promoCodes: [],
  },
  reducers: {
    setPromoCodes: (state, action) => {
      state.promoCodes = action.payload;
    },
    deletePromocode: (state, action) => {
      state.promoCodes = state.promoCodes.filter(
        (promoCode) => promoCode.id !== action.payload.id
      );
    },
    updatePromoCode: (state, action) => {
      state.promoCodes = state.promoCodes.filter(
        (promoCode) => promoCode.id !== action.payload.id
      );
    },
  },
});

export const { setPromoCodes, deletePromocode, updatePromoCode } =
  promocodeSlice.actions;
export default promocodeSlice.reducer;
