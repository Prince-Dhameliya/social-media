import React, { useEffect, useRef, useState } from 'react'
import "./Conversations.css"
import axios from "axios"
import { useSelector } from 'react-redux';
import Conversation from './Conversation';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../Messages/Message';
import Back from "../../img/Back.svg"
import { getUser } from '../../api/UserRequest';
import {io} from "socket.io-client";
import Vertical from "../../img/Vertical3Dot.svg"
import ConversationOptionModel from '../DropdownButton/ConversationOptionModel';

const Conversations = ({screenSize}) => {
  const [openMore, setOpenMore] = useState(false);
  let [conversations, setConversations] = useState([]);
  let [messages, setMessages] = useState([]);
  let [onlineFriend, setOnlineFriend] = useState([]);
  let [arrivalMessages, setArrivalMessages] = useState("");
  let [currentFriendChat, setCurrentFriendChat] = useState({});
  let [currentFriendData, setCurrentFriendData] = useState({});
  let socket = useRef();
  const {user} = useSelector((state)=>state.authReducer.authData);
  let navigate = useNavigate();
  let params = useParams();
 
  useEffect(()=>{
    socket.current = io("ws://localhost:7000");
    socket.current.on("getMessage", data=>{
      setArrivalMessages({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  },[])

  useEffect(()=>{
    arrivalMessages && currentFriendChat?.members?.includes(arrivalMessages.senderId) && 
    setMessages((prev)=>[...prev, arrivalMessages])
  },[arrivalMessages,currentFriendChat])

  useEffect(()=>{
    socket.current.emit("addUser",user._id);
    socket.current.on("getUsers",users=>{
      setOnlineFriend(users);
    })
  },[user._id])

  useEffect(()=>{
    const getConversations = async () => {
      const {data} = await axios.get(`/conversations/${user._id}`)
      setConversations(data);
      if(params?.id){
        setCurrentFriendChat(data.filter(t=>t._id === params?.id)[0]);
      }
      else{
        setCurrentFriendChat({});
        setCurrentFriendData({});
        setMessages([]);
      }
    }
    getConversations();
  },[user._id,params?.id])
  
  let desc = useRef();

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(()=>{
    const getMessages = async () => {
      try {
        const {data} = await axios.get(`/messages/${currentFriendChat?._id}/get`)
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    const friendId = currentFriendChat?.members?.find(member => member !== user._id)
    const getCurrentFriend = async () => {
        const {data} = await getUser(friendId);
        setCurrentFriendData(data);
    }
    if(currentFriendChat?._id){
      getMessages();
      getCurrentFriend();
    }
  },[currentFriendChat,user._id,messages])


  const resetComment = () => {
    desc.current.value = "";
  }

  function handleInput(){
    const myButton = document.getElementById("SendMesssageButton");
      if(desc.current.value){
        myButton.style.color = "rgb(4, 182, 231)"
      }
      else{
        myButton.style.color = "rgb(176, 226, 243)"
      }
  }

  const searchKeyPressed = (e) => {
    e = e || window.event;
    if (e.keyCode === 13)
    {
        document.getElementById("SendMesssageButton").click();
        return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(desc.current.value){
      const message = {
        senderId: user._id,
        text: desc.current.value,
        conversationId: currentFriendChat?._id,
      }

      try {
        const {data} = await axios.post("/messages",message);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }

      const receiverId = currentFriendChat?.members?.find(member => member !== user._id);
      socket.current.emit("sendMessage",{
        senderId: user._id,
        receiverId,
        text: desc.current.value,
      })
      // dispatch(commentPost(data._id, newComment))
      const myButton = document.getElementById("SendMesssageButton");
      myButton.style.color = "rgb(176, 226, 243)"
      resetComment();
    }
  }

  return (
    <div className="Conversations">
      {(screenSize.dynamicWidth > 700 || !params?.id) && <div id="AllChatBox" className="AllChatBox">
        <div className="TopBarMessages">
          <div className="MessageIconAndTitle">
            <img className='BackIcon' src={Back} alt="" onClick={() => {
              navigate(-1);
              setMessages([]);
            }} />
            <span className="MessageTitle">{user.username}</span>
          </div>
        </div>
        <div style={{marginLeft:"1rem"}}><h3>Messages</h3></div>
        <div className="ConversationsList">
          {conversations?.map((conversation,id) => {
            return <div key={id} onClick={()=>{
                if(params?.id !== conversation?._id){
                navigate(`/messages/${conversation?._id}`)
                setMessages([]);
                setCurrentFriendChat(conversation);
                }
              }}>
              <Conversation conversation={conversation} user={user} onlineFriend={onlineFriend}/>
            </div>
          })}
        </div>
      </div>}
      {(screenSize.dynamicWidth > 700 || params?.id) &&
      <div id="CurrentChatBox" className="CurrentChatBox">
        {currentFriendChat?._id ? <><div className="TopBarMessages">
          <div className="MessageIconAndTitle">
            <img className='BackIcon' src={Back} alt="" onClick={() => {
              navigate(-1);
              setMessages([]);
            }} />
            <img className='MessageProfile' src={currentFriendData.profilePicture} alt="" />
            <span className="MessageTitle">{currentFriendData?.username}</span>
          </div>
          <img className='BackIcon' src={Vertical} alt="" onClick={() => setOpenMore(true)}/>
          <ConversationOptionModel open={openMore} setOpen={setOpenMore} conversation={currentFriendChat} />
        </div>
        <div className="MessagesList">
          {messages?.map((message,id) => {
            return <Message key={id} currentFriendData={currentFriendData} message={message} own={message.senderId === user._id} user={user}/>
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="SendMessageSection">
          <input type="text" id="SendMessageInput" className="SendMessageInput" ref={desc} onKeyDown={searchKeyPressed} onChange={handleInput} placeholder='Message...' autoComplete="off" />
          <div id="SendMesssageButton" className="SendMesssageButton" onClick={handleSubmit} style={{fontSize: "16px", color: "rgb(176, 226, 243)",fontWeight:"600", cursor: "pointer"}}><span>Send</span></div>
        </div></> : <span style={{display:"flex", alignSelf:"center",fontSize:"25px", fontWeight: "700"}}>{!params?.id ? "No Current Chat" : ""}</span>}
      </div>}
    </div>
  )
}

export default Conversations