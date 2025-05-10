import Header from './Header';
import Footer from './Footer';
import Cursos from './Cursos';
import Login from './Login';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <main className="contenido">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute publicRoute>
                <Cursos />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <ProtectedRoute inverse>
                <Login />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;