import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/playmusic.png";
import "../css/signup.css";
import { Form, Button } from 'react-bootstrap';
import { SignupInterface, SignupResponse } from '../interface/signupInterface';
import { useState} from "react";
import properties from '../config/properties';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = (): JSX.Element => {
    const navigate = useNavigate();
    const signupObject:SignupInterface = {
        "email": "",
        "name": "",
        "password": ""
    };
    
    const [signupData, setSignupData] = useState(signupObject);

    const submitSignupForm = async (event: React.FormEvent<HTMLFormElement>):Promise<void> => {
        event.preventDefault();
        let response = await fetch(`${properties.SERVER_URL}/api/v1/users/signup`, {
            method: 'POST',
            body: JSON.stringify(signupData),
            headers: {
              'Content-Type': 'application/json'
            },
        });
        let signupResponse:SignupResponse = await response.json();
        if(signupResponse.status){
            toast.success(signupResponse?.message);
            setTimeout(()=>{
                navigate("/login");
            }, 2000);
        }else{
            toast.error(signupResponse?.message);
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
                {/* Signup Form */}
                <span className='fs-4 fw-bold my-3'>Sign up for free to start listening.</span>
                <Form onSubmit={submitSignupForm} className='mt-5'>
                    <div className='input-field-container'>
                        <Form.Label 
                            className='input-label' htmlFor="name">What should we call you?</Form.Label>
                        <Form.Control 
                            onChange={(e)=>{
                                signupData.name = e.target.value;
                                setSignupData({...signupData})
                            }}
                            id='name' name='name' className='input-field fs-5' 
                            type="text" placeholder="Enter a profile name" required />
                    </div>
                    <div className='input-field-container'>
                        <Form.Label 
                            className='input-label' htmlFor="email">What's your email?</Form.Label>
                        <Form.Control 
                            onChange={(e)=>{
                                signupData.email = e.target.value;
                                setSignupData({...signupData})
                            }}
                            id='email' name='email' className='input-field fs-5' 
                            type="email" placeholder="Enter email" required />
                    </div>
                    <div className='input-field-container'>
                        <Form.Label 
                            className='input-label' htmlFor="password">Create Password</Form.Label>
                        <Form.Control 
                            onChange={(e)=>{
                                signupData.password = e.target.value;
                                setSignupData({...signupData})
                            }}
                            id='password' name='password' className='input-field fs-5' 
                            type="password" placeholder="Create a password" required />
                    </div>
                    <p className='small-text-1 text-center'>
                        By clicking on sign-up, you agree to Spotify's <a href="#">Terms and Conditions of Use</a>.
                    </p>
                    <div className='container row'>
                        <Button type='submit' className='mx-auto ms-2'>Signup</Button>
                    </div>
                </Form>
                {/* Go to login page */}
                <div className='mt-5'>
                    <p className='text-center'>
                        Already have an account? 
                        <Link to={"/login"} className='ms-1'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;