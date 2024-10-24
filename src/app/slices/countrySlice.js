import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideLoader, showLoader } from './loaderSlice';

const initialState = {
  country: '',
  status: 'idle',
  error: null,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.country = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchCountry = createAsyncThunk('country/fetchCountry', async (territory_id, { dispatch }) => {
    dispatch(showLoader()); // Show loader before fetching
    try {
      const encodedTerritory = encodeURIComponent(territory_id);
      const response = await axios.get(
        `/api/fetchCountry?territory_id=${encodedTerritory}`
      );
      dispatch(hideLoader()); // Hide loader after fetching
      return response.data[0].country;
    } catch (error) {
      dispatch(hideLoader()); // Hide loader in case of an error
      throw error;
    }
  }
);

export default countrySlice.reducer;