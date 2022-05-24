import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import "./Sidebarthread.css"
import { getDocs, collection } from "firebase/firestore";
import { Link } from 'react-router-dom';

interface IProps {
id:string,
chatName:string,
}

const Sidebarthread = (props:IProps) => {

    return (
        <>

            <Link to={`/dash/${props.id}`}>
            < div className = 'sidebarthreads'>
                <Avatar />
                <div className='sidebarthread_details'>
                    <h3>{props.chatName}</h3> 
                    <small className='sidebarThread__timestamp'>timestamp</small>
                    {/* <small className='sidebarThread__timestamp'>{new Date(props.timestamp?.toDate()).toLocaleString()}</small> */}
    
                </div>
            </div>
            </Link>
                


        </>
    )
}

export default Sidebarthread