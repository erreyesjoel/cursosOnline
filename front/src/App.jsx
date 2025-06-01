import Header from './Header';
import Footer from './Footer';
import Cursos from './Cursos';
import Login from './Login';
import AdminPanel from './AdminPanel';
import './index.css';
import { Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import './panelAdmin.css';

const App = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <main className="contenido">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute publicRoute>
                <div className="landing-hero">
                  <div className="landing-content">
                    <h1>
                      <span className="landing-highlight">CursosOnline</span>
                      <br />
                      Aprende, crece y destaca
                    </h1>
                    <p>
                      Descubre una plataforma con cursos gratuitos y de calidad.<br />
                      ¡Elige tu camino y empieza a aprender hoy mismo!
                    </p>
                    <Link to="/cursos" className="landing-btn">
                      Ver Cursos
                    </Link>
                  </div>
                  <div className="landing-visual">
                    <div className="landing-shape"></div>
                    <img src="/vite.svg" alt="Logo CursosOnline" className="landing-logo" />
                    <div className="landing-bubble landing-bubble1"></div>
                    <div className="landing-bubble landing-bubble2"></div>
                  </div>
                </div>
              </ProtectedRoute>
            } />
            <Route path="/cursos" element={
              <ProtectedRoute publicRoute>
                <Cursos />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <ProtectedRoute inverse>
                <Login />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPanel />
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