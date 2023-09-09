import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset} from "../features/authSlice";

import logo from "../images/logo.svg";
import {EmailIcon, PasswordIcon }from "../common/icons/icons";
import '../common/style/login.scss';

const Login = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);

    useEffect(()=>{
        if(user || isSuccess){
            navigate("/dashboard");
        }
        dispatch(reset());
    },[user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({email,password}));
    };
  return (
    <div className="login-container">
        <div className="login-form">
            <form onSubmit={Auth} className="form-content">
                <img className="logo" src={logo} alt="Logo CourierHR" />
                <span className="login-span">
                    <b className="login-b">Witaj!</b>
                    Zaloguj się, aby kontynuować

                </span>
                <div className="login-field">
                    <label className="login-label">Email</label>
                    <div className="login-input-container">
                        <EmailIcon  className="email-icon"/>
                        <input className="input-text" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='kontakt@gmail.com'></input>
                    </div>
                </div>
                <div className="login-field">
                    <label className="login-label">Hasło</label>
                    <div className="login-input-container">
                    <PasswordIcon className="password-icon"/>
                        <input className="input-text" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='*******'></input>
                    </div>
                </div>
                {isError && <p>{message}</p>}
                <button className="login-submit" type="submit">{isLoading ? 'Loading...' : 'Zaloguj się'}</button>
                <div className="a-link">Odzyskaj hasło</div>
            </form>
        </div>
    </div>
  )
}

export default Login