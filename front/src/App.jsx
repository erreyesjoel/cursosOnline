import Header from './Header';
import Footer from './Footer';
import Cursos from './Cursos';
import Login from './Login';
import './index.css';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <main className="contenido">
          <Routes>
            <Route path="/" element={<Cursos />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
