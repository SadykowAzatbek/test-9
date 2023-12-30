import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../App/store';
import axiosApi from '../../axiosApi';
import {transaction} from './transactionSlice';
import {category} from "./categorySlice";

export const fetchTransactionPost = createAsyncThunk<void, undefined, {state: RootState}>(
  'transaction/post',
  async (_, thunkAPI) => {
    const data = thunkAPI.getState().transaction;

    await axiosApi.post<transaction>('transactions.json', data);
  },
);

export const fetchGetTransactions = createAsyncThunk<transaction[]>(
  'transactions/get',
  async () => {
    const response = await axiosApi.get<{[key: string]: transaction}>('transactions.json');
    const items = response.data;

    if (!items) {
      return [];
    }

    return Object.keys(items).map((key) => {
      const item = items[key];
      return {
        ...item,
        id: key,
      };
    });
  },
);

export const deleteOneTransaction = createAsyncThunk<void, string>(
  'transactions/delete',
  async (id) => {
    await axiosApi.delete<transaction>('transactions/' + id + '.json');
  },
);

export const fetchOneTransaction = createAsyncThunk<transaction, string>(
  'transaction/get',
  async (id) => {
    const response = await axiosApi.get<transaction | null>('transactions/' + id + '.json');
    const item = response.data;

    if (item === null) {
      throw new Error('Not found');
    }

    return item;
  },
);

export const fetchEditDish = createAsyncThunk<void, string, {state: RootState}>(
  'transaction/edit',
  async (id, thunkAPI) => {
    const data = thunkAPI.getState().transaction;
    await axiosApi.put('transactions/' + id + '.json', data);
  },
);

export const fetchCategoryPost = createAsyncThunk<void, undefined, {state: RootState}>(
  'category/post',
  async (_, thunkAPI) => {
    const data = thunkAPI.getState().category;

    await axiosApi.post<transaction>('category.json', data);
  },
);

export const fetchGetCategories = createAsyncThunk<category[]>(
  'categories/get',
  async () => {
    const response = await axiosApi.get<{[key: string]: category}>('category.json');
    const items = response.data;

    if (!items) {
      return [];
    }

    return Object.keys(items).map((key) => {
      const item = items[key];
      return {
        ...item,
        id: key,
      };
    });
  },
);

export const deleteOneCategory = createAsyncThunk<void, string>(
  'category/delete',
  async (id) => {
    await axiosApi.delete<category>('category/' + id + '.json');
  },
);