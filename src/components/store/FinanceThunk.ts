import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../App/store';
import axiosApi from '../../axiosApi';
import {transaction} from './transactionSlice';

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
      return[];
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