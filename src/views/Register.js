import React, {useState, useRef,useEffect} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {isEmail} from 'validator';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";


const required = (value)=>{
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">
                This field is required.
            </div>
        );
    }
};

const validEmail = (value)=>{
    if (!isEmail(value)){
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};
const vusername = (value)=>{
    if(value.length < 3 || value.length > 20 ){
        return(
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value)=>{
    if(value.length < 6 || value.length > 40){
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
const onMatchPassword=({password:password, cpassword:cpassword})=>{
    if(password != cpassword){
        return (
            <div className="alert alert-danger" role="alert">
                The password does not match, try again.
            </div>
        );
    }
}
export const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/comentarios');
        }
    })
    const onChangeFirstname =(e)=>{
        const firstname = e.target.value;
        setFirstname(firstname);
    }

    const onChangeLastname=(e)=>{
        const lastname = e.target.value;
        setLastname(lastname);
    }

    const onChangeUsername = (e)=>{
        const username = e.target.value;
        setUsername(username);
    }

    const onChangeEmail=(e)=>{
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword=(e)=>{
        const password = e.target.value;
        setPassword(password);
    }

    const onChangeCPassword=(e)=>{
        const cpassword = e.target.value;
        setCpassword(cpassword);
    }

    

    const handleRegister = (e)=>{
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        
        form.current.validateAll();
        if(password != cpassword){
            return setMessage("Las contraseñas no coinciden, revisa nuevamente");
        }else{
            axios.post('https://apirestdiccionario.herokuapp.com/api/signup',{
                firstname: firstname,
                lastname:lastname,
                username,username,
                email:email,
                password:password,
                cpassword:cpassword,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
                    "Access-Control-Allow-Origin": "*",
                    "X-Requested-With":'XMLHttpRequest'
                }
              }).then(function (response) {
                console.log(response.data);
                localStorage.setItem("user-info", JSON.stringify(response.data));
                setMessage("Usuario Creado con exito");
                setSuccessful(true);
              })
              .catch(function (error) {
                console.log(error);
                setMessage("Ha ocurrido un error, intentalo mas tarde");
                setSuccessful(false);
              });
        }
        // if(checkBtn.current.context._errors.length ===0){
            
        // }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img 
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleRegister} ref={form}>
                    {
                        !successful &&(
                            <div>
                                <div className="form-group">
                                    <label htmlFor="firstname">FirstName</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="firstname"
                                        value={firstname}
                                        onChange={onChangeFirstname}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastname">Lastname</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="lastname"
                                        value={lastname}
                                        onChange={onChangeLastname}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={onChangeEmail}
                                        validations={[required, validEmail]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">UserName</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required,vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required,vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cpassword">Confirm Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="cpassword"
                                        value={cpassword}
                                        onChange={onChangeCPassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>

                            </div>
                    )}
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
                    <p>Ya tienes una cuenta? <Link to="/login">Inicia Sesion</Link></p>
                </Form>
            </div>
        </div>

        
    )
}

export default Register;