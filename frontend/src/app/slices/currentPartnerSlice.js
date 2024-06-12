import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  banners: [],
};

const currentPartnerSlice = createSlice({
  name: 'currentPartner',
  initialState,
  reducers: {
    setCurrentPartnerState: (state, action) => {
      return action.payload;
    },
    clearCurrentPartner: () => initialState,
  },
});

export const { setCurrentPartnerState, clearCurrentPartner } = currentPartnerSlice.actions;

export default currentPartnerSlice.reducer;
