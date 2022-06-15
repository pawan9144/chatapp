import { Avatar } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { auth, db } from '../firebase/firebase'
import "./message.css"




// interface IProps {
//     id:string,
//     message:string,
//     email:string,
//     photoUrl:string,
//     uid:string,
//     }

const Message = (props: any) => {
    const { photoUrl, message, uid, isread, id, timestamp } = props.message


    const messageClass = uid === auth?.currentUser?.uid ? 'message__sender' : 'received';
    return (
        <>
            <div className={`message ${messageClass}`} >
                <div className='message_photo'>

                    <Avatar src={photoUrl} alt="img" />
                </div>
                <div className='message__contents'>
                    <p className='message_content'><span><AiFillCheckCircle className={isread ? "readunraedmsgsen" : "readunraedmsgrec"} /></span>{message}</p>
                    <small className='message_timestamp'>{new Date(timestamp?.toDate())?.toLocaleString()}</small>
                </div>

            </div>
        </>

    )
}

export default Message