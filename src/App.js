import logo from './logo.svg';
import './App.css';
import Header from './views/Header';
import {Routes,Route} from "react-router-dom";
import Login from './views/Login';
import Register from './views/Register';
import Diccionario from './views/Diccionario';
import Home from './views/Home';
import Comentarios from './views/Comentarios';
function App() {
  return (
    <div className="App">

      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/diccionario" element={<Diccionario />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comentarios" element={<Comentarios />} />

  
      </Routes>
    </div>
  );
}

export default App;
