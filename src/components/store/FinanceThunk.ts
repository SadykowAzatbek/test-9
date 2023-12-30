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