import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute  =({Component}: any) =>{
    
    return localStorage.getItem("user") ? <Component/>:<Navigate to="/"/>
}