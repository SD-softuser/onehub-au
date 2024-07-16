import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  banners: [],
  status: 'idle',
  error: null,
};

// export const fetchBanners = createAsyncThunk(
//   'banners/fetchBanners',
//   async ({ country, partner }) => {
//     const response = await axios.get(
//       `https://storehub-image.testexperience.site/next_level/storehub-company/${country}/${partner}/banners`
//     );
//     return response.data.images; // Assuming the API returns only images array
//   }
// );


export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async ({ country, partner }) => {
    // const response = await axios.get(
    //   `https://storehub-image.testexperience.site/next_level/storehub-company/${country}/${partner}/banners`
    // );
    // return response.data.images; // Assuming the API returns only images array
  
    const response = await axios.get(
      `https://cms-data.testexperience.site/completedatafetcher/test-store-hub-page-banners/${country}/${partner}`
    );
    const data = response.data;
    const value = Object.values(data)[0];

    // console.log("Redux - ", value);

    return value;
  }
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default bannersSlice.reducer;
