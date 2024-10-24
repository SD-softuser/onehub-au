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
      `https://cms.testexperience.site/completedatafetcher/test-store-hub-page/${country}`
    );
    const data = response.data;
    const value = Object.values(data)[0];
    const arrayOfObjects = Object.entries(value).map(([key, value]) => {
      return { name: key, ...value };
    });
    return arrayOfObjects;
    
    // const response1 = await axios.get(
    //   `https://cms-data.testexperience.site/completedatafetcher/test-store-hub-page-banners/${country}`
    // );
    // console.log(response1.data);
    // const data1 = response1.data;
    // const value1 = Object.values(data1)[0];
    // console.log(value1);

    // const response2 = await axios.get(
    //   `https://cms-data.testexperience.site/completedatafetcher/test-store-hub-page-logos/${country}`
    // );
    // console.log(response2.data);
    // const data2 = response2.data;
    // const value2 = Object.values(data2)[0];
    // console.log(value2);

    return null;
  } catch (error) {
    throw error;
  } finally {
    dispatch(hideLoader());
    dispatch(hideLoader());
  }
});

export default dataSlice.reducer;