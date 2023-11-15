import React, { Component } from 'react';
import Axios from 'axios';
import './Signup.css';
import googleLoginImage from '../assets/google.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function GoogleLoginButton() {
    const googleLogin = useGoogleLogin({
        onSuccess: codeResponse => {
            console.log(codeResponse);
            Axios.get('http://127.0.0.1:8000/api/security/get_csrf/')
            .then(() => {
                const csrftoken = getCookie('csrftoken');
                // Send POST request inside .then() to ensure the sequence
                Axios.post('http://127.0.0.1:8000/api/accounts/google_login/', 
                    { codeResponse }, 
                    { withCredentials: true,
                        headers: {
                            'X-CSRFToken': csrftoken
                        } 
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            window.location.href = '/practicenew';
                        }
                    })
                    .catch((error) => {
                        this.setState({ error: 'Login failed, please check your username and password.' });
                    });
            })
            .catch(error => {
                console.error("Error getting CSRF token:", error);
            });
        },
        flow: 'auth-code',
    });

    return (
        <button onClick={googleLogin} className="google-login-button"> 
            <img src={googleLoginImage} alt="Google Login" className="google-login-image" />
        </button>
    );
}

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            error: null,
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSignup = async () => {
        const { username, email, password } = this.state;
        await Axios.post('http://127.0.0.1:8000/api/accounts/signup/', { username, email, password })
            .then((response) => {
                if (response.status === 201) {
                    window.location.href = '/login';
                }
            })
            .catch((error) => {
                this.setState({ error: error.response.data.message });
            });
    }

    navigateToLogin = () => {
        window.location.href = '/Login'; 
    }
    

    render() {
        const { username, email, password, error } = this.state;
        return (
            <GoogleOAuthProvider clientId="700866041657-ssctsn9f5d7deq4r17knsrlt0hdiuv0m.apps.googleusercontent.com">
                <div id="root">
                    <div className="background">
                        <div className="outer-container">
                            <button className="first-button" onClick={this.handleGoogleLogin}> Signup with Google </button>
                            <h1 className="title">Get Started Now !</h1>
                            <div className="square-signup"></div>
                            <div className="form-container">
                                <GoogleLoginButton />
                                <div className="split-line">
                                    <hr className="line" />
                                    <p className="text">Or</p>
                                    <hr className="line" />
                                </div>
                                {error && <p>{error}</p>}
                                <h3 className="subtitle">Username</h3>
                                <input type="text-signup" name="username" placeholder="Username" value={username} onChange={this.handleInputChange} />
                                <h3 className="subtitle">Email Address</h3>
                                <input type="email-signup" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
                                <h3 className="subtitle">Password</h3>
                                <input type="password-signup" name="password" placeholder="Password" value={password} onChange={this.handleInputChange} />
                                <button className="second-button" onClick={this.handleSignup}>Create Account</button>
                                <p>Have an account? <span onClick={this.navigateToLogin} style={{color: 'blue', cursor: 'pointer'}}>Sign in</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </GoogleOAuthProvider>
        );
    }
}

export default Signup;