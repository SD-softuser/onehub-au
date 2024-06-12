import { createSlice } from '@reduxjs/toolkit';
import { partnersList } from '../../../constants';

const initialState = {
    currentPartner: partnersList[0],
};

const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setCurrentPartner: (state, action) => {
      state.currentPartner = action.payload;
    },
  },
});

export const { setCurrentPartner } = partnerSlice.actions;
export default partnerSlice.reducer;
