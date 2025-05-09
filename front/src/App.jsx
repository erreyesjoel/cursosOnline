import Header from './Header';
import Cursos from './Cursos';
import Footer from './Footer';
import './index.css';

const App = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <main className="contenido">
          <Cursos />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
