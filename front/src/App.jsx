import Header from './Header';
import Footer from './Footer';
import Cursos from './Cursos';
import Login from './Login';
import AdminPanel from './AdminPanel'; // Para el panel del admin, poner su route
import './index.css';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import './panelAdmin.css'; // importar el panel de admin css

const App = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <main className="contenido">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute publicRoute>
                {/* Aquí puedes poner una portada o dejarlo vacío */}
                <h1>Bienvenido a CursosOnline</h1>
                <p>¡Explora nuestros cursos en la sección Cursos!</p>
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
            } 
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;