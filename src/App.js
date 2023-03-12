import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';
import { FontAwesomeIcon } from 'react-awesome-reveal';
function App() {
  return (
    <div className='App'>
      <h1>React CRUD operations using PHP API And MySQL</h1>
      <BrowserRouter>
        <nav>
          <ul>
          <li className='header-btn list'>
          <i class="fa-sharp fa-solid fa-list"></i><Link className='link' to="/">List User</Link>
            </li>
            <li className='header-btn create'>
            <i class="fa-solid fa-plus"></i><Link className='link' to="user/create">Create User</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListUser/>} />
          <Route path="user/create" element={<CreateUser/>} />
          <Route path="user/:id/edit" element={<EditUser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
