import {transaction} from './transactionSlice';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deleteOneTransaction, fetchGetTransactions, fetchOneTransaction} from './FinanceThunk';
import {RootState} from '../../App/store';

export interface transactions {
  items: transaction[];
  itemsLoading: boolean;
  deleteTransaction: boolean | string;
  oneTransaction: transaction | null;
  oneLoading: boolean;
}

const initialState: transactions = {
  items: [],
  itemsLoading: false,
  deleteTransaction: false,
  oneTransaction: null,
  oneLoading: false,

}

export const transactionsSlice = createSlice({
  name: 'transactions/items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetTransactions.pending, (state) => {
      state.itemsLoading = true;
    });
    builder.addCase(fetchGetTransactions.fulfilled, (state, {payload: items}) => {
      state.itemsLoading = false;
      state.items = items;
    });
    builder.addCase(fetchGetTransactions.rejected, (state) => {
      state.itemsLoading = false;
    });
    builder.addCase(deleteOneTransaction.pending, (state, {meta}) => {
      state.deleteTransaction = meta.arg;
    });
    builder.addCase(deleteOneTransaction.fulfilled, (state) => {
      state.deleteTransaction = false;
    });
    builder.addCase(deleteOneTransaction.rejected, (state) => {
      state.deleteTransaction = false;
    });
    builder.addCase(fetchOneTransaction.pending, (state) => {
      state.oneLoading = true;
    });
    builder.addCase(fetchOneTransaction.fulfilled, (state,{payload: transaction}: PayloadAction<transaction>) => {
      state.oneLoading = false;
      state.oneTransaction = transaction;
    });
    builder.addCase(fetchOneTransaction.rejected, (state) => {
      state.oneLoading = false;
    });
  },
});

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectItemsLoading = (state: RootState) => state.transactions.itemsLoading;
export const selectTransactionDelete = (state: RootState) => state.transactions.deleteTransaction;
export const selectOneTransaction = (state: RootState) => state.transactions.oneTransaction;
export const selectOneLoading = (state: RootState) => state.transactions.oneLoading;