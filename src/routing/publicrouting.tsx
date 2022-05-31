import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

export const PublicRoutes = ({ Component,refresh}: any) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('user')){
            navigate('/home')
        }
    },[refresh]);

    return Component
}