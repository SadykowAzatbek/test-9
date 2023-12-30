import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../App/hooks";
import {selectCategories, selectDeleteCategory, selectIsLoading} from "../store/categoriesSlice";
import Loader from "../Loader/Loader";
import {useEffect} from "react";
import {deleteOneCategory, fetchGetCategories} from "../store/FinanceThunk";

const Categories = () => {
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectIsLoading);
  const deleteLoad = useAppSelector(selectDeleteCategory);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(fetchGetCategories());
    };

    void fetchUrl();
  }, [dispatch]);

  const onDelete = async (id: string) => {
    await dispatch(deleteOneCategory(id));
    await dispatch(fetchGetCategories());
  };

  return (
    <>
      <div className="d-flex justify-content-between mt-2">
        <h4>Categories</h4>
        <Link to="/categories/new" className="btn btn-light">Add</Link>
      </div>
      <div className="d-flex flex-column gap-3 mt-3">
        {isLoading ? (<Loader />) : categories.map((elem) => (
          <div key={elem.id} className="d-flex justify-content-between align-items-center border border-dark p-3 rounded-2">
            <div>{elem.name}</div>
            <strong>{elem.type}</strong>
            <div className="d-flex flex-column gap-2">
              <button className="btn btn-warning">edit</button>
              <button className="btn btn-danger ms-1"
                      onClick={() => onDelete(elem.id)}
                      disabled={deleteLoad === elem.id}
              >
                {deleteLoad && deleteLoad === elem.id && (<Loader />)}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;