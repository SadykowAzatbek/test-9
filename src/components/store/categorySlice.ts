import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../App/store";

export interface category {
  id: string;
  name: string;
  category: string;
}

const initialState: category = {
  id: '',
  name: '',
  category: '',
};

export const categorySlice = createSlice({
  name: 'category/slice',
  initialState,
  reducers: {
    addCategory: (state, {payload}: PayloadAction<category>) => {
      state.name = payload.name;
      state.category = payload.category;
    },
    cleanCategory: (state) => {
      state.name = '';
      state.category = '';
    }
  },
});

export const categoryReducer = categorySlice.reducer;
export const {addCategory, cleanCategory} = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category;