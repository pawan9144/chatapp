
import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import { AiOutlineBell, AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";
import Sidebarthread from '../Sidebarthread/Sidebarthread';
import { Avatar, setRef } from '@mui/material';
import { AiOutlineAlignLeft } from "react-icons/ai";
// import Showmodal from '../modal/modal';
import { auth, db } from '../firebase/firebase';
import { signOut } from "firebase/auth";
import TelegramDataService from "../../service/service"
import { Overlay, Popover } from 'react-bootstrap';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';







const Sidebar = () => {
  const [show, setShow] = useState<boolean>(false);
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [target, setTarget] = useState(null);
  const [refresh, setRefresh] = useState(0)
  const navigate = useNavigate();


  const [mQuery, setMQuery] = useState({
    matches: window.innerWidth > 600 ? true : false,
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const { email, fullname, photoURL, uid } = user


  const handleshow = (event: any) => {
    setShow(!show)
    setTarget(event.target);
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
        navigate('/');
      })
      .catch((err) => alert(err.message));
  };

  //   useEffect(() => {
  //     async function getCities() {
  // const citiesCol = collection(db, 'chats');
  // const citySnapshot = await getDocs(citiesCol);

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




  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     const data = await db.collection("users").onSnapshot((snapshot) => {
  //       setAllUsers(
  //         snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email)
  //       );
  //     });
  //   };



  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const data: any = await TelegramDataService.getAlluser();
    // setAllUsers(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })));
    setAllUsers(data.docs.filter((doc: any) => doc.data().newUser?.email !== email));
    // setAllUsers(data.docs.filter((doc: any) => doc.data().email !== email));
  };


  // const searchedUser = allUsers.filter((user: any) => {
  //   // const searchfilter = user.data().newUser?.fullname
  //   // console.log(">>>>>>>>>>>>>>",searchfilter)
  //   if (searchInput) {
  //     if (
  //       user.data().newUser?.fullname?.toLowerCase().includes(searchInput.toLowerCase())
  //     ) {
  //       return user;
  //     }
  //   }
  // });

  // console.log(searchedUser)




  const sendrequest = async (id: any) => {
    try {
      if (id !== undefined && id !== "") {
        await addDoc(collection(db, "notification"), {
          friendid: id,
          senderuid: uid,
          photoUrl: photoURL,
          displayName: fullname,
          email: email,
          status: "pending"
        }).then(() => setRefresh(Math.random()));
      }
    } catch (err: any) {
      console.log({ error: true, msg: err.message });
    }

  }






  useEffect(() => {
    const citiesCol = collection(db, 'notification');
    const unsubscribe = onSnapshot(citiesCol, (querySnapshot) => {
      let array: any = []
      querySnapshot?.docChanges().forEach((item: any) => {
        array.push({ ...item.doc.data(), id: item.doc.id });
      })
      setNotification(array);
    })
  }, [refresh]);

  ////////////////


  const Reject = async (id: any) => {
    try {
      if (id !== undefined && id !== "") {
        const noteRef = doc(db, "notification", id);
        await updateDoc(noteRef, {
          status: "Reject"
        });
      }
    } catch (err: any) {
      console.log({ error: true, msg: err.message });
    }


  }


  const Accept = async (id: any, p: any) => {
    try {
      console.log("????????????????", p);
      if (id !== undefined && id !== "") {
        const noteRef = doc(db, "notification", id);
        await updateDoc(noteRef, {
          status: "Accept"
        });
      }
    } catch (err: any) {
      console.log({ error: true, msg: err.message });
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
                <input className='search_input' type="text"
                  autoComplete='off'
                  name="search"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

              </div>
              <div className='sidebar__button'>
                <AiOutlineUserAdd onClick={addChat} />

                {/* <AiOutlineUserAdd onClick={toggle}/> */}
                {/* <Showmodal isOpen={isOpen} toggle={toggle}/> */}
              </div>


            </div>
            {searchInput.length > 0 &&
              <div>
                {allUsers.filter((post: any) => {
                  if (searchInput === "") {
                    return post;
                  } else if (post.data().newUser?.email?.toLowerCase().includes(searchInput.toLowerCase())) {
                    return post;
                  }
                }).map((post: any, index) => (
                  <div className="box" key={index}>
                    <p>{post.data().newUser?.email} <span className="sendrequest" onClick={() => sendrequest(post?.id)}>Send Request</span></p>
                  </div>
                ))}
              </div>
            }




            <div className='sidebar__threads'>
              {/* <Sidebarthread chatAdded={newChatAdded} /> */}
              <>
                {chats.map((item: any) => {


                  return (<Sidebarthread
                    id={item.id}
                    key={item.id}
                    chatName={item.chatName}
                  />
                  )
                })}
              </>


            </div>
            <div className='sidebar_bottom'>
              <Avatar className='sidebar__bottom_avatar' src={photoURL} alt="ser" />

              <AiOutlineBell className='notificationbell' onClick={handleshow} />
              <button onClick={signout}>Logout</button>

            </div>
            {

              <Overlay show={show} placement="top" target={target}>
                <Popover>

                  <Popover.Body>
                    {notification.map((post: any, index: any) => {
                      if (post.status === "pending") {
                        return <div className="notificationpopup" key={index}>
                          <p>{post.email} </p>
                          <p>
                            <span className="notificationpopupbtn" onClick={() => Reject(post.id)} >Reject</span>
                            <span className="notificationpopupbtn" onClick={() => Accept(post.id,post)}>Accept</span>
                          </p>

                          {/* <p>{post.value}</p> */}
                        </div>;
                      }

                    })}
                  </Popover.Body>
                </Popover>
              </Overlay>
            }

          </div>
        </>

      }
    </>

  )
}

export default Sidebar