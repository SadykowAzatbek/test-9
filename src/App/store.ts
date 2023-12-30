import {configureStore} from '@reduxjs/toolkit';
import {transactionReducer} from '../components/store/transactionSlice';
import {transactionsReducer} from '../components/store/transactionsSlice';

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    transactions: transactionsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;