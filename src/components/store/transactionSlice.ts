import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../App/store';

export interface transaction {
  id: string;
  type: string;
  category: string;
  amount: string;
  date: string;
}

const initialState: transaction = {
  id: '',
  type: '',
  category: '',
  amount: '',
  date: '',
};

export const transactionSlice = createSlice({
  name: 'transaction/slice',
  initialState,
  reducers: {
    addTransaction: (state, {payload: value}: PayloadAction<transaction>) => {
      state.type = value.type;
      state.category = value.category;
      state.amount = value.amount;
    },
    addDate: (state) => {
      const now = new Date();
      state.date = now.toISOString();
    },
    cleanTransaction: (state) => {
      state.type = '';
      state.category = '';
      state.amount = '';
    },
  },
});

export const transactionReducer = transactionSlice.reducer;
export const {
  addTransaction,
  addDate,
  cleanTransaction,
} = transactionSlice.actions;

export const selectorTransaction = (state: RootState) => state.transaction;
