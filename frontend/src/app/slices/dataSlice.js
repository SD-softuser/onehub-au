import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoader, showLoader } from './loaderSlice';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchData = createAsyncThunk('data/fetchData', async (country, { dispatch }) => {
  dispatch(showLoader());
  try {
    const response = await axios.get(
      `https://cms-data.testexperience.site/completedatafetcher/test-store-hub-page/${country}`
    );
    const data = response.data;
    const value = Object.values(data)[0];
    const arrayOfObjects = Object.entries(value).map(([key, value]) => {
      return { name: key, ...value };
    });
    return arrayOfObjects;
  } catch (error) {
    throw error;
  } finally {
    dispatch(hideLoader());
    dispatch(hideLoader());
  }
});

export default dataSlice.reducer;