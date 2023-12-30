import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {addDate, addTransaction, cleanTransaction, selectorTransaction} from '../store/transactionSlice';
import {fetchEditDish, fetchOneTransaction, fetchTransactionPost} from '../store/FinanceThunk';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {selectOneLoading, selectOneTransaction} from "../store/transactionsSlice";
import Loader from "../Loader/Loader";

const FinanceForm = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {pathname} = useLocation();

  const dispatch = useAppDispatch();
  const transactionData = useAppSelector(selectorTransaction);
  const transaction = useAppSelector(selectOneTransaction);
  const oneLoading = useAppSelector(selectOneLoading);

  useEffect(() => {
    const fetchUrl = async () => {
      if (id) {
        await dispatch(fetchOneTransaction(id));
      }
    };

    void fetchUrl();
  }, [dispatch, id]);

  useEffect(() => {
    if (transaction) {
      dispatch(addTransaction(transaction));
    }

    if (pathname === '/add') {
      dispatch(cleanTransaction());
    }
  }, [dispatch, transaction, pathname]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;

    dispatch(addTransaction({...transactionData, [name]: value}));

    if (!id && name === 'type' && !transactionData.date) {
      dispatch(addDate());
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await dispatch(fetchEditDish(id));
    } else {
      await dispatch(fetchTransactionPost());
    }

    dispatch(cleanTransaction());

    navigate('/');
  };

  const cancelBtn = () => {
    dispatch(cleanTransaction());

    navigate('/');
  };

  return (
    <div>
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

          {transactionData.type === '' && <select />}

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
              <option>products</option>
            </select>
          )}
          <input
            id="amount"
            name="amount"
            type="number"
            required
            value={transactionData.amount}
            onChange={onChange}
          />
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-light" type="button" onClick={cancelBtn}>
              cancel
            </button>
            <button className="btn btn-primary" type="submit">
              {oneLoading ? <Loader /> : id ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinanceForm;