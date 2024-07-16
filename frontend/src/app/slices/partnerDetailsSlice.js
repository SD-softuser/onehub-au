import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPartnerDetails = createAsyncThunk(
  'partnerDetails/fetchPartnerDetails',
  async ({ country, partner }) => {
    const response = await axios.get(
      `https://cms-data.testexperience.site/completedatafetcher/test-store-hub-page-logos/${country}/${partner}`
    );

    const data = response.data;
    const value = Object.values(data)[0].Logo;
    
    const checked = value.checked;
    const square = value.logo;
    const unchecked = value.unchecked;

    // console.log("Redux", { partner, checked, square, unchecked });

    return { partner, checked, square, unchecked };
  }
);

const initialState = {
  details: {},
  selectedPartner: null,
  status: 'idle',
  error: null,
};

const partnerDetailsSlice = createSlice({
  name: 'partnerDetails',
  initialState,
  reducers: {
    setSelectedPartner(state, action) {
      state.selectedPartner = action.payload;
    },
    clearSelectedPartner(state) {
      state.selectedPartner = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartnerDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPartnerDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { partner, checked, square, unchecked } = action.payload;
        state.details[partner] = { checked, square, unchecked, name: partner };
      })
      .addCase(fetchPartnerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { setSelectedPartner, clearSelectedPartner } = partnerDetailsSlice.actions;

export default partnerDetailsSlice.reducer;
