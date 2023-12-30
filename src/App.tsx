import './App.css';
import {NavLink} from 'react-router-dom';

function App() {
  return (
    <>
      <header>
        <h1>Finance Tracker</h1>
        <nav>
          <ul className="d-flex">
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/add">Add</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default App;
