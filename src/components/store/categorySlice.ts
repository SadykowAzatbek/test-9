import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../App/store";

export interface category {
  id: string;
  name: string;
  type: string;
}

const initialState: category = {
  id: '',
  name: '',
  type: '',
};

export const categorySlice = createSlice({
  name: 'category/slice',
  initialState,
  reducers: {
    addCategory: (state, {payload}: PayloadAction<category>) => {
      state.name = payload.name;
      state.type = payload.type;
    },
    cleanCategory: (state) => {
      state.name = '';
      state.type = '';
    }
  },
});

export const categoryReducer = categorySlice.reducer;
export const {addCategory, cleanCategory} = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category;