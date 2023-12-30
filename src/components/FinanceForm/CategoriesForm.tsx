import React from "react";
import {useAppDispatch, useAppSelector} from "../../App/hooks";
import {fetchCategoryPost} from "../store/FinanceThunk";
import {addCategory, cleanCategory, selectCategory} from "../store/categorySlice";
import {useNavigate} from "react-router-dom";

const CategoriesForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const categoryData = useAppSelector(selectCategory);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(fetchCategoryPost());

    dispatch(cleanCategory());

    navigate('/categories');
  }

  const onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;

    dispatch(addCategory({...categoryData, [name]: value}));
  };

    return (
    <div className="mt-3">
      <form onSubmit={onSubmit} className="d-flex w-50 flex-column gap-1">
        <select id="type" name="type" required value={categoryData.type} onChange={onChange}>
          <option></option>
          <option>Expense</option>
          <option>Income</option>
        </select>
        <input id="name" name="name" type="text" required value={categoryData.name} onChange={onChange} />
        <button className="btn btn-primary" type="submit">Save</button>
      </form>
    </div>
  );
};

export default CategoriesForm;