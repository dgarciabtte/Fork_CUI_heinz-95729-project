import React, { Component } from 'react';
import Axios from 'axios';
import './Login.css';
import getCookie from '../utils/Cookie';
import googleLoginImage from '../assets/google.png'
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

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: null,
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleLogin = () => {
        const { username, password } = this.state;
    
        //get csrf
        Axios.get('http://127.0.0.1:8000/api/security/get_csrf/')
            .then(() => {
                const csrftoken = getCookie('csrftoken');
                // Send POST request inside .then() to ensure the sequence
                Axios.post('http://127.0.0.1:8000/api/accounts/login/', 
                    { username, password }, 
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
                        this.setState({ error: error.response.data.message });
                    });
            })
            .catch(error => {
                console.error("Error getting CSRF token:", error);
            });
    }

    navigateToSignup = () => {
        window.location.href = '/Signup'; 
    }
    

    render() {
        const { username, password, error } = this.state;
        return (
            <GoogleOAuthProvider clientId="700866041657-ssctsn9f5d7deq4r17knsrlt0hdiuv0m.apps.googleusercontent.com">
                <div id="root">
                    <div className="background">
                        <div className="outer-container">
                            <h1 className="title">Welcome Back !</h1>
                            <div className="square"></div>
                            <div className="form-container">
                                <GoogleLoginButton />
                                <div className="split-line">
                                    <hr className="line" />
                                    <p className="text">Or</p >
                                    <hr className="line" />
                                </div>
                                {error && <p>{error}</p >}
                                <h3 className="subtitle">Username</h3>
                                <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleInputChange} />
                                <h3 className="subtitle">Password</h3>
                                <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleInputChange} />
                                <button className="second-button" onClick={this.handleLogin}>Login</button>
                                <p>Don't have an account? <span onClick={this.navigateToSignup} style={{color: 'blue', cursor: 'pointer'}}>Create one here.</span></p>
                            <p style={{position: 'absolute', bottom: '10px'}}>2023 Enterview.ai, All rights reserved.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </GoogleOAuthProvider>
        );
    }

}

export default Login;