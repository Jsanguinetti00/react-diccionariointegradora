import React, {useState,useRef,useEffect} from 'react'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link} from 'react-router-dom';
import '../css/Puntuacion.css';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
const Comentarios = () => {
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [userComentario, setComentario] = useState("");
    const [userPuntuacion, setPuntuacion] = useState("");
    const [idUser, setIdUser] = useState('');
    const [bToken, setBToken]= useState('');
    const [getPrevComments, setPrevComments]=useState([]);
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            let userData = localStorage.getItem('user-info');
            userData =JSON.parse(userData);
            setIdUser(userData['id']);
            setBToken(userData['access_token']);
        }
    });
    useEffect( ()=>{
        axios.get(`http://127.0.0.1:8000/api/opinion`)
        .then( response => {
            console.log(response.data);

            setPrevComments(response.data);
        }).catch( err => {
            console.log(err);
        });
    },[])
    
    const handlePrevComments =()=>{
        axios.get(`http://127.0.0.1:8000/api/opinion`)
        .then( response => {
            console.log(response.data);

            setPrevComments(response.data);
        }).catch( err => {
            console.log(err);
        });
    }
    const handleComentario =(e)=>{
        const comentario = e.target.value;
        setComentario(comentario);
    }
    const handlePuntuacion=(e)=>{
        const puntuacion = e.target.value;
        setPuntuacion(puntuacion);
        
    }
    const handleOnSubmit= (e)=>{
        e.preventDefault();
        
        form.current.validateAll();
        axios.post('http://127.0.0.1:8000/api/opinion',{
                puntuacion:userPuntuacion,
                comentario:userComentario,
                usuario_id:idUser,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
                    "Access-Control-Allow-Origin": "*",
                    "X-Requested-With":'XMLHttpRequest'
                }
              }).then(response=> {
                navigate('/comentarios')
                setMessage("Se ha añadido el comentario exitosamente");
                setSuccessful(true);
                handlePrevComments();
                
              })
              .catch(error => {
                console.log(error);
                setMessage("Ha ocurrido un error al guardar el comentario");
                setSuccessful(false);
                
              });
              
    }
    
    return (
        <div className="">
            
            {
                localStorage.getItem('user-info')?
                <div className="card card-comentario">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                        <Form onSubmit={handleOnSubmit} ref={form}>
                            <div className="form-group">
                                <label htmlFor="email">comentario:</label>
                                <Input 
                                    type="text"
                                    className="form-control"
                                    name="comentario"
                                    value={userComentario}
                                    onChange={handleComentario}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                            <div className="clasificacion">
                                <div className="column">
                                    <div className="col">
                                        <input id="radio1" type="radio" name="estrellas" value="5" onChange={handlePuntuacion}/>
                                        <label htmlFor="radio1">★</label>
                                        <input id="radio2" type="radio" name="estrellas" value="4" onChange={handlePuntuacion}/>
                                        <label htmlFor="radio2">★</label>
                                        <input id="radio3" type="radio" name="estrellas" value="3" onChange={handlePuntuacion}/>
                                        <label htmlFor="radio3">★</label>
                                        <input id="radio4" type="radio" name="estrellas" value="2" onChange={handlePuntuacion}/>
                                        <label htmlFor="radio4">★</label>
                                        <input id="radio5" type="radio" name="estrellas" value="1" onChange={handlePuntuacion}/>
                                        <label htmlFor="radio5">★</label>
                                    </div>
                                    <div className="col">
                                        
                                    </div>
                                    <div className="col">
                                        
                                    </div>
                                    <div className="col">
                                        
                                    </div>
                                    <div className="col">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                                
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                            </button>
                        </div>
                        {message && (
                        <div className="form-group">
                        <div
                            className={ successful ? "alert alert-success" : "alert alert-danger" }
                            role="alert"
                        >
                            {message}
                        </div>
                        </div>
                        )}
                        
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
                :
                <div className="card card-comentario">
                    <div className="form-group">
                        <h3>Para poder dejar una calificacion y comentario</h3> 
                        <h3>primero debes iniciar sesion</h3> 
                        <Link to="/login"><button className="btn btn-info">Iniciar Sesion</button></Link>
                    </div>
                    
                </div>
            }
            <h1>Comentarios Anteriores</h1>
            {
                getPrevComments?
                getPrevComments.map((data,index)=>
                    <div className="card card-comentario" key={data.id}>
                        <div className="form-group">
                            <h5>{data.username}</h5> 
                            <h3>{data.dataOpinion[index].comentario}</h3> 
                        </div>
                    </div>
                )
                
                : <h1>No hay info</h1>

            }
        </div>
    )
}

export default Comentarios
