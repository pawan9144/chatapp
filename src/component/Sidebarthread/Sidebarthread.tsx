import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase/firebase'
import "./Sidebarthread.css"
import { getDocs, collection, getDoc, onSnapshot, doc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import TelegramDataService from "../../service/service"

interface IProps {
    id: string,
    friend: string,
    timestamp: any
}

const Sidebarthread = (props: IProps) => {
    const [user, setUser] = useState({ email: '' })
    const [data, setData] = useState<any>("");
    const [msgcount, setMsgcount] = useState("")

    useEffect(() => {
        if (props?.friend) {

            TelegramDataService.getchatuser(props?.friend).then((res) => {
                setUser(res?.data()?.newUser)
            });
        }
    }, [props.friend])

    useEffect(() => {
        let unsub = onSnapshot(doc(db, "lastMsg", props?.id), (doc: any) => {
            setData(doc.data());
        });
        return () => unsub();
    }, []);




    const getmsg = async (id: any) => {
        const getchatdata = doc(db, "chats", id);
        let colRef = collection(getchatdata, "messages")
        const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
            const data:any = querySnapshot?.docs?.filter((doc: any) => doc?.data()?.isread !== true);
            setMsgcount(data.length)
        })

    };


    useEffect(() => {
        if (props.id !== undefined && props.id !== "") {
            getmsg(props.id);
        }
    }, [props.id]);

    return (
        <>

            <Link to={`/dash/${props.id}`}>
                < div className='sidebarthreads'>
                    <Avatar />
                    <div className='sidebarthread_details'>
                        <h3>
                            {/* {props.chatName} */}
                            {user?.email}
                        </h3>
                        {/* <small className='sidebarThread__timestamp'>timestamp</small> */}
                        {/* <small className='sidebarThread__timestamp'>{new Date(data?.createdAt?.toDate()).toLocaleString()}</small> */}
                        {data && (
                            <p className="truncate">
                                <strong>{data?.uid === auth?.currentUser?.uid ? "Me:" : null}</strong>
                                {data.message}
                                <div className='unseenmsg'>
                                    <p>{msgcount}</p>
                                </div>

                                <small className='sidebarThread__timestamp'>{new Date(data?.createdAt?.toDate()).toLocaleString()}</small>
                            </p>
                        )}

                    </div>
                </div>
            </Link>



        </>
    )
}

export default Sidebarthread