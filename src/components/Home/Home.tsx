import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectItemsLoading, selectTransactionDelete, selectTransactions} from '../store/transactionsSlice';
import Loader from '../Loader/Loader';
import {useEffect} from 'react';
import {deleteOneTransaction, fetchGetTransactions} from '../store/FinanceThunk';
import {Link} from "react-router-dom";

const Home = () => {

  const dispatch = useAppDispatch();

  const transactionsItem = useAppSelector(selectTransactions);
  const itemsLoading = useAppSelector(selectItemsLoading);
  const deleteTransaction = useAppSelector(selectTransactionDelete);

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(fetchGetTransactions());
    }

    void fetchUrl();
  }, [dispatch]);

  const total = () => {
    return transactionsItem.reduce((acc, item) => {
      const amount = parseFloat(item.amount);

      if (item.type === 'Income') {
        return acc + amount;
      } else if (item.type === 'Expense') {
        return acc - amount;
      }

      return acc;
    }, 0);
  };

  const deleteOneTransactionItem = async (id: string) => {
    await dispatch(deleteOneTransaction(id));
    await dispatch(fetchGetTransactions());
  };

  const sortedTransactions = [...transactionsItem].reverse();

  return (
    <>
      <h2>Total: {total()} KGZ</h2>
      <div className="d-flex flex-column gap-2 mt-5">
        {itemsLoading ? (<Loader />) : sortedTransactions.map((item) => (
          <div key={item.id} className="d-flex border border-dark rounded-2 w-75 justify-content-between ms-auto me-auto p-2 align-items-center">
            <div>
              <div>Date: {item.date}</div>
              <strong className="ms-3">{item.category}</strong>
            </div>
            <div>{item.type === 'Income' && '+' + item.amount || item.type === 'Expense' && '-' + item.amount} KGZ</div>
            <div>
              <Link to={"/" + item.id + '/edit'} className="btn btn-light">Edit</Link>
              <button className="btn btn-danger ms-1"
                      onClick={() => deleteOneTransactionItem(item.id)}
                      disabled={deleteTransaction === item.id}
              >
                {deleteTransaction && deleteTransaction === item.id && (<Loader />)}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;