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
    const [firstcal, setFirstcal] = useState("");
    const [secondcal, setSecondcal ]=useState('');
    const [thirdcal, setThirdcal]=useState('');
    const [fourcal, setFourcal]=useState('');
    const [idUser, setIdUser] = useState('');
    // const [getPrevComments, setPrevComments]=useState([]);
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            let userData = localStorage.getItem('user-info');
            userData =JSON.parse(userData);
            setIdUser(userData['id']);
        }
    });
    // useEffect( ()=>{
    //     axios.get(`http://127.0.0.1:8000/api/opinion`)
    //     .then( response => {
    //         console.log(response.data);

    //         setPrevComments(response.data);
    //     }).catch( err => {
    //         console.log(err);
    //     });
    // },[])
    
    // const handlePrevComments =()=>{
    //     axios.get(`http://127.0.0.1:8000/api/opinion`)
    //     .then( response => {
    //         console.log(response.data);

    //         setPrevComments(response.data);
    //     }).catch( err => {
    //         console.log(err);
    //     });
    // }
    const handleComentario =(e)=>{
        const comentario = e.target.value;
        setComentario(comentario);
    }
    const handleFirstCal=(e)=>{
        const puntuacion = e.target.value;
        setFirstcal(puntuacion);
        
    }
    const handleSecondCal=(e)=>{
        const puntuacion = e.target.value;
        setSecondcal(puntuacion);
        
    }
    const handleThirdCal=(e)=>{
        const puntuacion = e.target.value;
        setThirdcal(puntuacion);
        
    }
    const handleFourCal=(e)=>{
        const puntuacion = e.target.value;
        setFourcal(puntuacion);
    }
    const handleOnSubmit= (e)=>{
        e.preventDefault();
        
        form.current.validateAll();
        setSuccessful(false);
        axios.post('https://apirestdiccionario.herokuapp.com/api/encuesta',{
                firstcal:firstcal,
                secondcal:secondcal,
                thirdcal:thirdcal,
                fourcal:fourcal,
                comentario:userComentario,
                usuario_id:idUser,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
                    "Access-Control-Allow-Origin": "*",
                    "X-Requested-With":'XMLHttpRequest'
                }
              }).then(response=> {
                console.log(response.data);
                navigate('/comentarios')
                setMessage("Se ha añadido el comentario exitosamente");
                setSuccessful(true);
                // handlePrevComments();
                
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
                    <h3>Encuesta de satisfacción</h3>
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                        
                        <Form onSubmit={handleOnSubmit} ref={form}>
                            
                        {/*  */}
                        <div className="form-group">
                            <h4>¿Que puntuacion le darias a la funcionalidad de la pagina?</h4>
                            <div className="">
                                <div className="column">
                                    <div className="clasificacion col">
                                        <input id="radio1" type="radio" name="first" value="5" onChange={handleFirstCal}/>
                                        <label htmlFor="radio1">★</label>
                                        <input id="radio2" type="radio" name="first" value="4" onChange={handleFirstCal}/>
                                        <label htmlFor="radio2">★</label>
                                        <input id="radio3" type="radio" name="first" value="3" onChange={handleFirstCal}/>
                                        <label htmlFor="radio3">★</label>
                                        <input id="radio4" type="radio" name="first" value="2" onChange={handleFirstCal}/>
                                        <label htmlFor="radio4">★</label>
                                        <input id="radio5" type="radio" name="first" value="1" onChange={handleFirstCal}/>
                                        <label htmlFor="radio5">★</label>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className="form-group">
                            <h4>¿El acceso a la Página Web resultó fácil?</h4>
                            <div className="">
                                <div className="column">
                                    <div className="clasificacion2 col ">
                                        <input id="radio6" type="radio" name="second" value="5" onChange={handleSecondCal}/>
                                        <label htmlFor="radio6" className="testeo">★</label>
                                        <input id="radio7" type="radio" name="second" value="4" onChange={handleSecondCal}/>
                                        <label htmlFor="radio7" className="testeo">★</label>
                                        <input id="radio8" type="radio" name="second" value="3" onChange={handleSecondCal}/>
                                        <label htmlFor="radio8" className="testeo">★</label>
                                        <input id="radio9" type="radio" name="second" value="2" onChange={handleSecondCal}/>
                                        <label htmlFor="radio9" className="testeo">★</label>
                                        <input id="radio10" type="radio" name="second" value="1" onChange={handleSecondCal}/>
                                        <label htmlFor="radio10" className="testeo">★</label>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        {/*  */}
                        <div className="form-group">
                            <h4>¿Pudo entrar a la Página Web desde el primer intento, sin necesidad de insistir en más de una ocasión.?</h4>
                            <div className="clasificacion3">
                                <div className="column">
                                    <div className="col">
                                        <input id="radio11" type="radio"  name="third" value="5" onChange={handleThirdCal}/>
                                        <label htmlFor="radio11" >★</label>
                                        <input id="radio12" type="radio"  name="third" value="4" onChange={handleThirdCal}/>
                                        <label htmlFor="radio12">★</label>
                                        <input id="radio13" type="radio" name="third" value="3" onChange={handleThirdCal}/>
                                        <label htmlFor="radio13">★</label>
                                        <input id="radio14" type="radio" name="third" value="2" onChange={handleThirdCal}/>
                                        <label htmlFor="radio14">★</label>
                                        <input id="radio15" type="radio" name="third" value="1" onChange={handleThirdCal}/>
                                        <label htmlFor="radio15">★</label>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        {/*  */}
                        <div className="form-group">
                            <h4>¿Navegar dentro de la Página Web resulta una experiencia fácil.?</h4>
                            <div className="clasificacion4">
                                <div className="column">
                                    <div className="col">
                                        <input id="radio16" type="radio" name="four" value="5" onChange={handleFourCal}/>
                                        <label htmlFor="radio16">★</label>
                                        <input id="radio17" type="radio" name="four" value="4" onChange={handleFourCal}/>
                                        <label htmlFor="radio17">★</label>
                                        <input id="radio18" type="radio" name="four" value="3" onChange={handleFourCal}/>
                                        <label htmlFor="radio18">★</label>
                                        <input id="radio19" type="radio" name="four" value="2" onChange={handleFourCal}/>
                                        <label htmlFor="radio19">★</label>
                                        <input id="radio20" type="radio" name="four" value="1" onChange={handleFourCal}/>
                                        <label htmlFor="radio20">★</label>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {/*  */}

                        <div className="form-group">
                            <label htmlFor="email">Dejar algun comentario: (opcional)</label>
                            <Input 
                                type="text"
                                className="form-control"
                                name="comentario"
                                value={userComentario}
                                onChange={handleComentario}
                            />
                        </div>
                        {/*  */}
                        <div className="form-group">
                            <br/>
                            <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Mandar Encuesta</span>
                            </button>
                        </div>
                        <br/>
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
            {/* <h1>Comentarios Anteriores</h1>
            {
                getPrevComments?
                getPrevComments.map((data,index)=>
                    <div className="card card-comentario" key={data.user[index].id}>
                        <div className="form-group">
                            <h5>{data.user[index].username}</h5> 
                            <h3>{data.comentario}</h3> 
                        </div>
                    </div>
                )
                
                : <h1>No hay info</h1>

            } */}
        </div>
    )
}

export default Comentarios
