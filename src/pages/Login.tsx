import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/playmusic.png";
import "../css/signup.css";
import { Form, Button } from 'react-bootstrap';
import properties from '../config/properties';
import { useState } from 'react';
import {LoginFromInterface, LoginResponse} from '../interface/loginInterfaces';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ():JSX.Element => {

    const navigate = useNavigate();

    const loginObjectStructure:LoginFromInterface = {
        email: "",
        password: ""
    }

    const [loginData, setLoginData] = useState(loginObjectStructure);

    const submitLoginForm = async (event: React.FormEvent<HTMLFormElement>):Promise<void>  => {
        event.preventDefault();

        if(loginData.email && loginData.password){
            let response = await fetch(`${properties.SERVER_URL}/api/v1/users/login`, {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                  'Content-Type': 'application/json'
                },
            });
            let loginResponse:LoginResponse = await response.json();
            if(loginResponse && loginResponse?.auth){
                localStorage.setItem("userToken", loginResponse?.token);
                navigate("/");
            }else{
                toast.error(loginResponse?.message);
            }
        }
    }

    return (
        <div className="container-fluid signup-container position-absolute top-0 bg-dark text-white min-vh-100">
            <ToastContainer />
            <div className="d-flex flex-column align-items-center">
                {/* Logo */}
                <div className='mt-5'>
                    <Link to={"/"} className="text-decoration-none align-itemcenter ms-4">
                        <img src={logo} className="logo" alt="" srcSet="" />
                        <span id="logo" className="fs-4 pt-4 align-middle">Photos Hub</span>
                    </Link>
                </div>
                {/* Login Form */}
                <span className='fs-4 fw-bold mt-5'>To continue, log in to PhotosHub.</span>
                <Form method='POST' onSubmit={submitLoginForm} className='mt-5'>
                    <div className='input-field-container'>
                        <Form.Label 
                            className='input-label' htmlFor="email">Email address</Form.Label>
                        <Form.Control 
                            onChange={(e)=>{
                                loginData.email = e.target.value;
                                setLoginData({...loginData});
                            }}
                            id='email' name='email' className='input-field fs-5' 
                            type="email" placeholder="Enter email" required />
                    </div>
                    <div className='input-field-container'>
                        <Form.Label 
                            className='input-label' htmlFor="password">Password</Form.Label>
                        <Form.Control 
                            onChange={(e)=>{
                                loginData.password = e.target.value;
                                setLoginData({...loginData});
                            }}
                            id='password' name='password' className='input-field fs-5' 
                            type="password" placeholder="Enter password" required />
                    </div>
                    <div className='container row'>
                        <Button type='submit' className='ms-2'>Login</Button>
                    </div>
                    <div className="hr-line w-100 mt-5"></div>
                </Form>
                {/* Go to signup page */}
                <div className='mt-5'>
                    <p className='text-center fs-5 semi-bold'>
                        Don't have an account?
                    </p>
                    <div className='d-flex justify-content-center'>
                    <Link to={"/signup"} className='ms-1'>
                        <button className='m-auto common-btn bg-light text-dark'>Signup</button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;