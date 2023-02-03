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
import $ from 'jquery';

// const App_URL = "social-point-36.vercel.app";
// const App_URL = "localhost:5000/";
let socket;

const Conversations = ({screenSize}) => {
  const [openMore, setOpenMore] = useState(false);
  let [conversations, setConversations] = useState([]);
  let [messages, setMessages] = useState([]);
  let [onlineFriend, setOnlineFriend] = useState([]);
  let [arrivalMessages, setArrivalMessages] = useState("");
  let [currentFriendChat, setCurrentFriendChat] = useState({});
  let [currentFriendData, setCurrentFriendData] = useState({});
  const {user} = useSelector((state)=>state.authReducer.authData);
  let navigate = useNavigate();
  let params = useParams();
  let desc = useRef();
  const ENDPOINT = 'https://socket-two.vercel.app/';
 
  useEffect(()=>{
    socket = io(ENDPOINT);
    socket.on("getMessage", data=>{
      setArrivalMessages({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    });  
    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  },[ENDPOINT])
  
  useEffect(()=>{
    socket.on("getDeleteMessage", data=>{
      let newMessages = messages;
      newMessages = newMessages.filter(m=>m._id !== data.messageId);
      setMessages(newMessages);
    })
  },[messages.length])
  
  useEffect(()=>{
    socket.emit("addUser",user._id);
    socket.on("getUsers",users=>{
      setOnlineFriend(users);
    })
  },[user._id])

  useEffect(()=>{
    arrivalMessages && currentFriendChat?.members?.includes(arrivalMessages.senderId) && 
    setMessages((prev)=>[...prev, arrivalMessages])
    // console.log("ArrivalMessages");
  },[arrivalMessages,currentFriendChat.members])


  useEffect(()=>{
    const getConversations = async () => {
      const {data} = await axios.get(`/api/conversations/${user._id}`)
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

  useEffect(()=>{
    const friendId = currentFriendChat?.members?.find(member => member !== user._id)
    const getCurrentFriend = async () => {
        const {data} = await getUser(friendId);
        setCurrentFriendData(data);
    }
    if(currentFriendChat?._id){
      getCurrentFriend();
    }
    $(".MessagesList").scrollTop(5*$(".Profile").height());
  },[currentFriendChat?._id,user?._id])

  useEffect(()=>{
    const getMessages = async () => {
      try {
        const {data} = await axios.get(`/api/messages/${currentFriendChat?._id}/get`)
        setMessages(data);
        $(".MessagesList").scrollTop(5*$(".Profile").height());
      } catch (error) {
        console.log(error);
      }
    };
    if(currentFriendChat?._id){
      getMessages();
      // console.log("totalmessages");
    }
    // var page = 0;
    // var isLoading = false;

    // function loadNewPage() {
    //   var temp = $(".Profile").height();
    //   var temp1 = $(".MessagesList").height();
    //     console.log(`${temp} + ${temp1}`);
    //     page++;
        // $(".MessagesList").prepend('<div class="big-box"><h1>Page ' + page + '</h1></div>');
    //     $(".MessagesList").scrollTop(temp-temp1);
    //     isLoading = false;
    // }

    // $(".MessagesList").scroll(function() {
    //   console.log($(".MessagesList").scrollTop());
    //   if($(".MessagesList").scrollTop() < 1 && !isLoading) {
    //     isLoading = true;
    //     setTimeout(loadNewPage, 1200);
    //   }
      
    // });

    // $(".MessagesList").scrollTop(5*$(".Profile").height());
  },[currentFriendChat?._id,messages.length])


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
        conversationId: currentFriendChat?._id,
        senderId: user._id,
        text: desc.current.value,
      }

      try {
        const {data} = await axios.post("/api/messages",message);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error);
      }

      const receiverId = currentFriendChat?.members?.find(member => member !== user._id);
      socket.emit("sendMessage",{
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
            return <Message key={id} currentFriendData={currentFriendData} socket={socket} message={message} messages={messages} setMessages={setMessages} own={message.senderId === user._id} user={user}/>
          })}
          <div className='LastMessage' />
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