import { Avatar } from '@mui/material'
import React from 'react'
import { auth } from '../firebase/firebase'
import "./message.css"




// interface IProps {
//     id:string,
//     message:string,
//     email:string,
//     photoUrl:string,
//     uid:string,
//     }
    
const Message = (props:any) => {
    const{photoUrl,message,uid}=props.message
 const messageClass = uid === auth?.currentUser?.uid ? 'message__sender' : 'received';
    return (
        <>
        <div className={`message ${messageClass}`} >
            <Avatar className='message_photo' src={photoUrl} alt="img" />
            <div className='message__contents'>

                <p className='message_content'>{message}</p>
                <small className='message_timestamp'>timestamp</small>
            </div>

        </div>
        </>
        
    )
}

export default Message