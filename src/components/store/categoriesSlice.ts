import {category} from "./categorySlice";
import {createSlice} from "@reduxjs/toolkit";
import {deleteOneCategory, fetchGetCategories} from "./FinanceThunk";
import {RootState} from "../../App/store";

export interface categories {
  categoriesItem: category[];
  isLoading: boolean;
  deleteCategory: boolean | string;
}

const initialState: categories = {
  categoriesItem: [],
  isLoading: false,
  deleteCategory: false,
}

export const categoriesSlice = createSlice({
  name: 'categories/slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGetCategories.fulfilled, (state, {payload: items}) => {
      state.isLoading = false;
      state.categoriesItem = items;
    });
    builder.addCase(fetchGetCategories.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteOneCategory.pending, (state, {meta}) => {
      state.deleteCategory = meta.arg;
    });
    builder.addCase(deleteOneCategory.fulfilled, (state) => {
      state.deleteCategory = false;
    });
    builder.addCase(deleteOneCategory.rejected, (state) => {
      state.deleteCategory = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categoriesItem;
export const selectIsLoading = (state: RootState) => state.categories.isLoading;
export const selectDeleteCategory = (state: RootState) => state.categories.deleteCategory;