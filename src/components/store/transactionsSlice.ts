import {transaction} from './transactionSlice';
import {createSlice} from '@reduxjs/toolkit';
import {fetchGetTransactions} from './FinanceThunk';
import {RootState} from '../../App/store';

export interface transactions {
  items: transaction[];
  itemsLoading: boolean;
}

const initialState: transactions = {
  items: [],
  itemsLoading: false,
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
  },
});

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectItemsLoading = (state: RootState) => state.transactions.itemsLoading;