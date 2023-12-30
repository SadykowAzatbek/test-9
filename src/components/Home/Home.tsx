import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectItemsLoading, selectTransactions} from '../store/transactionsSlice';
import Loader from '../Loader/Loader';
import {useEffect} from 'react';
import {fetchGetTransactions} from '../store/FinanceThunk';

const Home = () => {
  const dispatch = useAppDispatch();

  const transactionsItem = useAppSelector(selectTransactions);
  const itemsLoading = useAppSelector(selectItemsLoading);

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

  return (
    <>
      <h2>Total: {total()} KGZ</h2>
      <div className="d-flex flex-column gap-2 mt-5">
        {itemsLoading ? (<Loader />) : transactionsItem.map((item) => (
          <div key={item.id} className="d-flex border border-dark rounded-2 w-75 justify-content-between ms-auto me-auto p-2 align-items-center">
            <div>
              <div>Date: {item.date}</div>
              <strong className="ms-3">{item.type}</strong>
            </div>
            <div>{item.type === 'Income' && '+' + item.amount || item.type === 'Expense' && '-' + item.amount} KGZ</div>
            <div>
              <button className="btn btn-light">Edit</button>
              <button className="btn btn-danger ms-1">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;