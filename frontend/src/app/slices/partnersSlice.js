import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPartners = createAsyncThunk('partners/fetchPartners', async (country) => {
  const response = await axios.get(
    `https://storehub-image.testexperience.site/next_level/storehub-company/${country}`
  );
  // console.log("redux response ", response.data);
  return response.data.subfolders;
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
