
import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import { AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";
import Sidebarthread from '../Sidebarthread/Sidebarthread';
import { Avatar } from '@mui/material';
import { AiOutlineAlignLeft } from "react-icons/ai";
// import Showmodal from '../modal/modal';
import { auth } from '../firebase/firebase';
import { signOut } from "firebase/auth";
import TelegramDataService from "../../service/service"







const Sidebar = () => {
  const [show, setShow] = useState(false);

  const [chats, setChats] = useState([])



  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 600 ? true : false,
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const { photoURL } = user


  const handleshow = () => {
    setShow(!show)
  }

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  const signout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
      })
      .catch((err) => alert(err.message));
  };

  //   useEffect(() => {
  //     async function getCities() {
  //         const citiesCol = collection(db, 'chats');
  //         const citySnapshot = await getDocs(citiesCol);

  //         const cityList: any = citySnapshot.docs.map(doc => ({
  //                 id: doc.id,
  //                 data: doc.data()
  //             }));
  //             setChats(cityList);
  //     }
  //     getCities()
  // }, []);
  useEffect(() => {
    getchats();
  }, []);

  const getchats = async () => {
    const data: any = await TelegramDataService.getAllChats();
    setChats(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
  };

  // const addChat = () => {

  //   const chatName = prompt('Please enter a chat name')
  //   if (chatName) {
  //     addDoc(collection(db, "chats"), {
  // chatName: chatName,
  // timestamp: serverTimestamp()
  //     });

  //   }


  // }


  const addChat = async () => {

    const chatName = prompt('Please enter a chat name')
    const addChat = {
      chatName: chatName

    };
    if (addChat) {
      await TelegramDataService.addChats(addChat);
    }
  }


  return (
    <>
      {
        mQuery && !mQuery.matches && <AiOutlineAlignLeft className='sidebarbutton' onClick={handleshow} />
      }
      {
        (show || mQuery.matches) && <>

          <div className='sidebar'>
            <div className='sidebar_header'>

              <div className='sidebar_search'>
                <AiOutlineSearch className='sidebar__searchIcon' />
                <input placeholder='search' className='search_input' />

              </div>
              <div className='sidebar__button'>
                <AiOutlineUserAdd onClick={addChat} />

                {/* <AiOutlineUserAdd onClick={toggle}/> */}
                {/* <Showmodal isOpen={isOpen} toggle={toggle}/> */}
              </div>
            </div>
            <div className='sidebar__threads'>
              {/* <Sidebarthread chatAdded={newChatAdded} /> */}
              <>
                {chats.map((item: any) => {


                  return (<Sidebarthread
                    id={item.id}
                    chatName={item.chatName}
                  />
                  )
                })}
              </>


            </div>
            <div className='sidebar_bottom'>
              <Avatar className='sidebar__bottom_avatar' src={photoURL} alt="ser" />
              <button onClick={signout}>Logout</button>

            </div>

          </div>
        </>

      }
    </>

  )
}

export default Sidebar