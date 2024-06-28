import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPartnerDetails = createAsyncThunk(
  'partnerDetails/fetchPartnerDetails',
  async ({ country, partner }) => {
    const response = await axios.get(
      `https://storehub-image.testexperience.site/next_level/storehub-company/${country}/${partner}`
    );

    const { images } = response.data;
    const checked = images[0];
    const square = images[1];
    const unchecked = images[2];

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
        state.details[partner] = { checked, square, unchecked };
      })
      .addCase(fetchPartnerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { setSelectedPartner, clearSelectedPartner } = partnerDetailsSlice.actions;

export default partnerDetailsSlice.reducer;
