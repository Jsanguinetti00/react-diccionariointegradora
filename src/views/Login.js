import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../css/Login.css';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const [emailUser, setEmailUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [remember_me, setRemember] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/comentarios');
        }
    })
    const handleEmailUser =(e)=>{
        setEmailUser(e.target.value)
    }
    const handlePasswordValue = (e)=>{
        setPassword(e.target.value);
    }
    const handleRemember = ()=>{
        setRemember(!remember_me);
        console.log(remember_me);
    }
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        form.current.validateAll();
        axios.post('https://apirestdiccionario.herokuapp.com/api/login',{
                email:emailUser,
                password:password,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "*"
                }
              }).then(function (response) {
                console.log(response.data);
                localStorage.setItem("user-info", JSON.stringify(response.data));
                navigate('/comentarios');
              })
              .catch(function (error) {
                console.log(error);
                
              });
    }
   
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleOnSubmit} ref={form}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <Input 
                            type="email"
                            className="form-control"
                            name="email"
                            value={emailUser}
                            onChange={handleEmailUser}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <Input 
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={handlePasswordValue}
                            validations={[required]}
                        />
                    </div>
                        <div className="form-group">
                        <label><input type="checkbox" onChange={handleRemember} /> Recordar?</label>
                        <br/>
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
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    <p>Aún no tienes una cuenta? <Link to="/register">Registrate</Link></p>
                </Form>
            </div>
        </div>
    )
}

export default Login



