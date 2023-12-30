import './App.css';
import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import Home from './components/Home/Home';
import FinanceForm from './components/FinanceForm/FinanceForm';
import Categories from './components/Categories/Categories';

function App() {
  const navigate = useNavigate();
  return (
    <>
      <header className="d-flex justify-content-between align-items-center border-bottom border-dark">
        <h1 onClick={() => navigate('/')}>Finance Tracker</h1>
        <nav>
          <ul className="d-flex list-unstyled gap-3">
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/add">Add</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<FinanceForm />} />
          <Route path="/:id/edit" element={<FinanceForm />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
