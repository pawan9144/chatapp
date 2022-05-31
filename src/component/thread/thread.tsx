import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AiOutlineMore, AiOutlineSend,AiFillMeh } from 'react-icons/ai'
import Message from '../message/message'
import "./thread.css"
import { useParams } from 'react-router-dom'
import TelegramDataService from "../../service/service"
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { db} from '../firebase/firebase'
import Picker from 'emoji-picker-react';


const Thread = () => {
    const [userDetails, setUserDetails] = useState<any>()
    const [messages, setMessages] = useState<any>([])
    const [input, setInput] = useState("");
    const [openEmojiBox, setOpenEmojiBox] = useState(false);

    const { chatID } = useParams();


    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const { email, fullname, photoURL, uid } = user



    // useEffect(() => {
    //     async function getCities(chatID:any) {
    //         const docRef = collection(db, 'chats', chatID);
    //         const docSnap: any = await getDocs(docRef);

    //         setUserDetails(docSnap);
    //     }
    //     getCities(chatID)
    // }, [chatID]);

    const getdata = async (id:any) => {
    //     const getchatdata = doc(db, "chats", id);
    //     let colRef = collection(getchatdata, "messages")
    //     const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
    //         querySnapshot?.docChanges().forEach((item : any)=>{
    //             setUserDetails(item.doc.data());
    //         })
    // })
        const docSnap: any = await TelegramDataService.getchat(chatID);
        setUserDetails(docSnap.data());

    };

    useEffect(() => {
        if (chatID !== undefined && chatID !== "") {
            getdata(chatID);
        }
    }, [chatID]);


    //   const sendMessage = (e) => {
    //     e.preventDefault();
    //     db.collection('chats').doc(chatId).collection('messages').add({
    //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //         message: input,
    //         uid: user.uid,
    //         photoUrl: user.photoUrl,
    //         email: user.email,
    //         displayName: user.displayName

    //     })

    //     setInput("")
    // }


    const addMessage = {
        message: input,
        uid: uid,
        photoUrl: photoURL,
        email: email,
        displayName: fullname

    };
    const sendMessage = async (e: any) => {
        e.preventDefault();
        if (chatID !== undefined && chatID !== "") {
            let send = await TelegramDataService.Addmessages(chatID, addMessage).then(()=>getmessagedata(chatID));
            setInput("");
        }

    }


    const getmessagedata = async (id:any) => {


        const getchatdata = doc(db, "chats", id);
            let colRef = collection(getchatdata, "messages")
            const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
                let array:any = []
                querySnapshot?.docChanges().forEach((item : any)=>{
                    // console.log("aayush",item.doc.data().message)
                    array.push(item.doc.data());
                })
                setMessages(array);
        })
        // const docnap: any = await TelegramDataService.getMessages(chatID);
        // setMessages(docnap.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));

    };
    // useEffect(()=>{
    //     console.log("aayush",messages)
    // },[messages])


    useEffect(() => {
        if (chatID !== undefined && chatID !== "") {
            getmessagedata(chatID);
        }
    }, [chatID]);


    return (
        <div className='thread'>
            <div className='thread__header'>
                <div className='thread__headerDetails'>
                    <Avatar />

                    <div className='thread__headerDetails_info'>
                        <h4>{
                        userDetails?.chatName}</h4>
                        <h5>Just Now</h5>

                    </div>
                </div>

                <div className='thread__headerMoreHoriz'>
                    <AiOutlineMore className='thread_morebutton' />
                </div>
            </div>
            <div className='thread__messages'>
                <>
                    {messages.map((item: any) => {
                        return (<Message
                            key={item.id}
                            id={item.id}
                            message={item}
                        />
                        )
                    })}
                </>
                {/* <Message /> */}
            </div>
            <div className='thread__input'>
                <div className="Emo-picker">
                    {openEmojiBox && (
                        <Picker
                            onEmojiClick={(event, emojiObject) =>
                                setInput(input + emojiObject.emoji)
                                
                            }
                        />
                    )}
                </div>
                <div className="chat-input-btn">
                    <AiFillMeh onClick={() => setOpenEmojiBox(openEmojiBox => !openEmojiBox)} style={{ cursor: "pointer" }} />
                </div>
                <form>
                    <input placeholder='Enter a message..' type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                    <div>
                        <AiOutlineSend onClick={sendMessage} />
                    </div>
                </form>

            </div>

        </div>
    )
}

export default Thread