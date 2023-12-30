import React from 'react';
import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {addDate, addTransaction, cleanTransaction, selectorTransaction} from '../store/transactionSlice';
import {fetchTransactionPost} from '../store/FinanceThunk';
import {useNavigate} from 'react-router-dom';

const FinanceForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const transactionData = useAppSelector(selectorTransaction);
  const onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;

    dispatch(addTransaction({...transactionData, [name]: value}));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const createdAt = now.toISOString();

    await dispatch(fetchTransactionPost());
    await dispatch(addDate(createdAt));

    dispatch(cleanTransaction());

    navigate('/');
  };

  const cancelBtn = () => {
    dispatch(cleanTransaction());

    navigate('/');
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="w-50 d-flex flex-column gap-2 mt-3">
        <select
          id="type"
          name="type"
          required
          value={transactionData.type}
          onChange={onChange}
        >
          <option></option>
          <option>Income</option>
          <option>Expense</option>
        </select>

        {transactionData.type === '' && (
          <select />
        )}

        {transactionData.type === 'Income' && (
          <select
            id="category"
            name="category"
            required
            value={transactionData.category}
            onChange={onChange}
          >
            <option></option>
            <option>salary</option>
            <option>business</option>
            <option>part-time job</option>
          </select>
        )}

        {transactionData.type === 'Expense' && (
          <select
            id="category"
            name="category"
            required
            value={transactionData.category}
            onChange={onChange}
          >
            <option></option>
            <option>food</option>
            <option>drink</option>
            <option>taxes</option>
          </select>
        )}
        <input id="amount" name="amount" type="number" required
               value={transactionData.amount}
               onChange={onChange}
        />
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-light" type="button" onClick={cancelBtn}>cancel</button>
          <button className="btn btn-primary" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default FinanceForm;