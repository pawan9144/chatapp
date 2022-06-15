import { db } from "../component/firebase/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { AnyRecord } from "dns";

const telegramdata= collection(db, "chats");
const telegramuserdata= collection(db, "users");
class TelegramDataService {
 
 
 
  addChats = (addChat:any) => {
    return addDoc(telegramdata, addChat);
  };

  Addmessages = (id:any, addMessage:any) => {
     const addmessagedata = doc(db, "chats", id);
     let timestamp = Timestamp.fromDate(new Date())
     const colRef:any = collection(addmessagedata, "messages");
     const minor:any = doc(colRef,timestamp.seconds.toString())
     return setDoc(minor,addMessage);

    //  return addDoc(colRef,addMessage);
   }; 
  

  getMessages = (id:any) => {
    const getchatdata = doc(db, "chats", id);
    const colRef = collection(getchatdata, "messages")
    // return new Promise(resolve=>onSnapshot(colRef,resolve))
    return getDocs(colRef);
  };


  getAllChats = () => {
    return getDocs(telegramdata);
  };

  getchat = (id:any) => {
    const getchatdata = doc(db, "chats", id);
    return getDoc(getchatdata);
  };



  getchatuser = (id:any) => {
    const getchatdata = doc(db, "users", id);
    return getDoc(getchatdata);
  };



  getAlluser = () => {
    return getDocs(telegramuserdata);
  };



  // updateBook = (id, updatenotification) => {
  //   const bookDoc = doc(db, "books", id);
  //   return updateDoc(bookDoc, updatenotification);
  // };

}

export default new TelegramDataService();