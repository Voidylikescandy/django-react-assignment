import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ItemListPage from './pages/ItemListPage';
import CategoryGroupsPage from './pages/CategoryGroupsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ItemListPage />} />
            <Route path="/categories" element={<CategoryGroupsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
