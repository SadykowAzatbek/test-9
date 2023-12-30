import {configureStore} from '@reduxjs/toolkit';
import {transactionReducer} from '../components/store/transactionSlice';
import {transactionsReducer} from '../components/store/transactionsSlice';
import {categoryReducer} from "../components/store/categorySlice";
import {categoriesReducer} from "../components/store/categoriesSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    transactions: transactionsReducer,
    category: categoryReducer,
    categories: categoriesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;