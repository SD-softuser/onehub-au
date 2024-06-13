import { createSlice } from '@reduxjs/toolkit';
import { CApartnersList } from '../../../constants';

const initialState = {
    currentPartner: CApartnersList[0],
};

const partnerCASlice = createSlice({
  name: 'partnerCA',
  initialState,
  reducers: {
    setCurrentPartner: (state, action) => {
      state.currentPartner = action.payload;
    },
  },
});

export const { setCurrentPartner } = partnerCASlice.actions;
export default partnerCASlice.reducer;
