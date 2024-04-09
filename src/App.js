import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import CrearPais from './components/CrearPais';
import ListPaises from './components/ListPaises';
import EditPais from './components/EditPais';
import ListEstados from './components/ListEstados';

function App() {
  return (
    <div className="App">
      
      <h5>REACT CRUD</h5>

      <BrowserRouter>
      
        <nav>
          <ul>
            <li>
              <Link to="/">Lista Países</Link>
            </li>
            <li>
              <Link to="pais/create">Nuevo País</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={<ListPaises />} />
          <Route path="pais/create" element={<CrearPais />} />
          <Route path="pais/:id/edit" element={<EditPais />} />
          <Route path="estados/:id/ver" element={<ListEstados />} />
        </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
