import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    update(state, action) {
      return action.payload;
    },
  },
});
export const getFilter = state => state.filter;
export const { update } = filterSlice.actions;
