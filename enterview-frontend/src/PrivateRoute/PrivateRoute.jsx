import {Navigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const PrivateRoute = ( {children} ) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); //needs modification
    console.log("printing");

    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/api/accounts/check_authenticated/')
            .then((response) => {
                const isAuthenticate = response.data.isAuthenticated;
                console.log(isAuthenticate); //this returns true when logged in
                setIsAuthenticated(isAuthenticate);
                console.log(isAuthenticated); //this still prints null
            })
            .catch(error => {
                console.error(error);
            });
    }, [])
    
    useEffect(() => {
        console.log("isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    return isAuthenticated ? children : <Navigate to='/login'/>;
}

export default PrivateRoute;