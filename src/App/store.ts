import {configureStore} from '@reduxjs/toolkit';
import {transactionReducer} from '../components/store/transactionSlice';
import {transactionsReducer} from '../components/store/transactionsSlice';
import {categoryReducer} from "../components/store/categorySlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    transactions: transactionsReducer,
    category: categoryReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;