import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import '../components/styles/Header.css';
const Header = () => {
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    const logOut=()=>{
        localStorage.clear();
        navigate('/login');

    }
    return (
        <div>
            <Navbar bg="black"  className="navbar_wrapper" variant="dark">
                <Navbar.Brand ><Link to="/">Inicio</Link></Navbar.Brand>
                <Nav className="me-auto navbar_wrapper">
                { localStorage.getItem('user-info')?
                    null
                    :<Link to="/login">Iniciar Sesion</Link>
                }
                
                <Link to="/diccionario">Diccionario</Link>
                <Link to="/comentarios">comentarios</Link>
                </Nav>
                {
                    localStorage.getItem('user-info')?
                    <Nav>
                        <NavDropdown className="navsito" title={user && user.username}>
                            <NavDropdown.Item className="letras" onClick={logOut}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    :null
                }
                
            </Navbar>
            
        </div>
    )
}

export default Header;
