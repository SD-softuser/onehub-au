import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPartners = createAsyncThunk('partners/fetchPartners', async (country) => {
  const response = await axios.get(
    `https://cms.testexperience.site/completedatafetcher/test-store-hub-page-logos/${country}`
  );
  const data = response.data;
  const firstKey = Object.keys(data)[0];
  const keysArray = Object.keys(data[firstKey]);
  // console.log("Redux" , keysArray);

  return keysArray;
});

const initialState = {
  partners: [],
  status: 'idle',
  error: null,
};

const partnersSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.partners = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default partnersSlice.reducer;
