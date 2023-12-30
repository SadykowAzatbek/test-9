import {Link} from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div className="d-flex justify-content-between mt-2">
        <h4>Categories</h4>
        <Link to="/categories/new" className="btn btn-light">Add</Link>
      </div>
    </>
  );
};

export default Categories;