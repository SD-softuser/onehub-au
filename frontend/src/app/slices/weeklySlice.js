import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoader, showLoader } from './loaderSlice';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const weeklySlice = createSlice({
  name: 'weekly',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeekly.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeekly.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeekly.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchWeekly = createAsyncThunk('data/fetchWeekly', async ({ country, partner }, { dispatch }) => {
  dispatch(showLoader());
  try {
    const response = await axios.get(
      `https://cms-data.testexperience.site/completedatafetcher/test-store-hub-page/${country}/${partner}`
    );

    const data = Object.values(response.data)[0];
    const { Banner, Logo, ...remainingValues } = data;
    const dataArray = Object.values(remainingValues);
    
    return dataArray;
  } catch (error) {
    throw error;
  } finally {
    dispatch(hideLoader());
  }
});

export default weeklySlice.reducer;