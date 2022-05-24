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
} from "firebase/firestore";
import { AnyRecord } from "dns";

const telegramdata= collection(db, "chats");
class TelegramDataService {
 
 
 
  addChats = (addChat:any) => {
    return addDoc(telegramdata, addChat);
  };

  Addmessages = (id:any, addMessage:any) => {
    console.log(">>>>>>>>>>>>>",id)
     const addmessagedata = doc(db, "chats", id);
     const colRef:any = collection(addmessagedata, "messages")
     return addDoc(colRef,addMessage);
   }; 
  

  getMessages = (id:any) => {
    const getchatdata = doc(db, "chats", id);
    const colRef = collection(getchatdata, "messages")
    return getDocs(colRef);
  };


  getAllChats = () => {
    return getDocs(telegramdata);
  };

  getchat = (id:any) => {
    const getchatdata = doc(db, "chats", id);
    return getDoc(getchatdata);
  };
}

export default new TelegramDataService();