import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, Users, LogOut, UserX,
  X, Send, Menu, MoreVertical, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg"

import { UserProfile } from '../../Store/UserAuth/UserAuth';

import { MyChat, GetMessage } from '../../Store/ChatAuth/ChatAuth';



const ChatPage = () => {


  // const [activeTab, setActiveTab] = useState('contacts');
  const [selectedChat, setSelectedChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // 🆕 desktop collapse
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState({});
  const messagesEndRef = useRef(null);

  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Main code Here Fetch User details 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get the logged-in user's profile
        const result = await UserProfile();

        const userId = result.data._id;

        setCurrentUserId(userId);
        setUser(result.data);

        // Step 2: Get the conversations after obtaining the user ID
        const response = await MyChat();



        // Step 3: Extract the other participant and last message
        const friends = response.data.flatMap((conversation) =>
          conversation.participants
            .filter(
              (participant) =>
                String(participant._id) !== String(userId)
            )
            .map((participant) => ({
              id: participant._id,
              username: participant.username,
              conversationId: conversation._id,
              lastMessage: conversation.lastMessage?.content || "",
            }))
        );

        // Step 4: Save the extracted data in React state
        setContacts(friends);

      } catch (error) {
        // console.error("Failed to fetch chat data:", error);
        toast.error(
          error.response?.data?.message || "Failed to load chats"
        );
      }
    };

    fetchData();
  }, []);


  // Chat Code 

  const quickReplies = [
    { emoji: '👋', text: 'Say Hello' },
    { emoji: '🤔', text: 'How are you?' },
    { emoji: '📅', text: 'Meet up soon?' },
  ];

  // const currentMessages = selectedChat ? messages[selectedChat.id] || [] : [];
  const currentMessages = selectedChat ? messages[selectedChat.conversationId] || [] : [];


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChat]);


  const handleSelectChat = async (contact) => {
    setSelectedChat(contact);
    setSidebarOpen(false);

    console.log("working !!")
    console.log(contact.conversationId)
    try {

      
      const result = await GetMessage(contact.conversationId);

      console.log(result)
      const fetchedMessages = result.data.map((msg) => {
        const senderId =
          typeof msg.sender === "object"
            ? msg.sender._id
            : msg.sender;

        return {
          id: msg._id,
          from: String(senderId) === String(currentUserId) ? "me" : "other",
          text: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });

      setMessages((prev) => ({
        ...prev,
        [contact.conversationId]: fetchedMessages,
      }));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };
  // const handleSelectChat = (contact) => {
  //   // setSelectedChat(contact);
  //   // setSidebarOpen(false);

  // };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  const sendMessage = (text) => {
    const clean = text.trim();
    if (!clean || !selectedChat) return;

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setMessages((prev) => {
      // const existing = prev[selectedChat.id] || [];
      const existing = prev[selectedChat.conversationId] || [];
      return {
        ...prev,

        [selectedChat.conversationId]: [
          ...existing,
          { id: existing.length + 1, from: 'me', text: clean, time },
        ],
      };
    });
  };

  const handleQuickReply = (text) => sendMessage(text);

  // 🆕 Unified toggle: collapses sidebar on desktop, closes it on mobile
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-0 md:p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="fixed inset-0 bg-purple-900/50 mix-blend-multiply pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-purple-950/80 pointer-events-none"></div>

      {/* Main Chat Container */}
      <div className="relative z-10 w-full max-w-6xl h-screen md:h-[85vh] bg-white/10 backdrop-blur-md md:rounded-2xl border border-white/20 shadow-2xl flex overflow-hidden">

        {/* ===== SIDEBAR ===== */}
        <aside
          className={`
            absolute md:relative z-30
            h-full flex flex-col
            bg-purple-950/60 backdrop-blur-xl md:bg-white/5
            border-r border-white/10
            transition-all duration-300 ease-in-out
            w-72 md:w-80
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            ${sidebarCollapsed ? 'md:-ml-80 md:opacity-0 md:pointer-events-none' : 'md:ml-0 md:opacity-100'}
          `}
        >
          {/* Sidebar Header */}
          <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                J
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-900"></span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{user.username}</p>
              <p className="text-emerald-300 text-xs">Online</p>
            </div>

            <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition" aria-label="Logout">
              <LogOut className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition" aria-label="Block">
              <UserX className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contact list */}
          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
            {contacts.map((contact) => {

              const isActive = selectedChat?.id === contact.id;
              const lastMsg = messages[contact.id]?.slice(-1)[0];

              const id = contact._id;
              const username = contact.username;

              const avatar = contact.username?.charAt(0).toUpperCase() || "?";
              const conversationId = contacts._id;
              const lastMessage = contact.lastMessage || "";

              return (
                <button
                  key={id}
                  onClick={() => handleSelectChat(contact)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-xl
                    transition text-left
                    ${isActive
                      ? 'bg-purple-500/25 border border-purple-400/40'
                      : 'bg-white/5 border border-white/5 hover:bg-white/10'}
                  `}
                >
                  <div className="relative" style={{ flexShrink: 0 }}>
                    <div className="w-10 h-10 rounded-full bg-slate-500/50 flex items-center justify-center text-white font-semibold">
                      {avatar}
                    </div>
                    {contact.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-900"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{username}</p>
                    {lastMsg && (
                      <p className="text-white/50 text-xs truncate">{lastMessage}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </aside>

        {/* Contact list */}
        {/* <div className=
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          ></div>
        )}

        {/* ===== MAIN CHAT AREA ===== */}
        <main className="flex-1 flex flex-col relative min-w-0">
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
            {/* 🆕 Toggle button — arrow icon */}
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
              aria-label={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
              title={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>

            {selectedChat ? (
              <>
                <div className="relative" style={{ flexShrink: 0 }}>
                  <div className="w-10 h-10 rounded-full bg-slate-500/50 flex items-center justify-center text-white font-semibold">
                    {selectedChat.username?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-900"></span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{selectedChat.username}</p>
                  <p className="text-emerald-300 text-xs">Online</p>
                </div>

                <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </>
            ) : (
              <p className="text-white/60 text-sm">Select a contact to start chatting</p>
            )}
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {!selectedChat ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Users className="w-10 h-10 text-white/40" />
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">Choose a contact from the sidebar to begin</p>
                </div>
              </div>
            ) : currentMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-purple-300" />
                    </div>
                  </div>

                  <h2 className="text-white font-semibold text-lg mb-2">
                    Start your conversation with {selectedChat.username}
                  </h2>

                  <p className="text-white/60 text-sm mb-6">
                    This is the beginning of your conversation. Send a message to start chatting!
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(reply.text)}
                        className="
                          flex items-center gap-1.5 px-3 py-1.5 rounded-full
                          bg-white/10 backdrop-blur-md border border-white/20
                          text-white/90 text-xs font-medium
                          hover:bg-white/20 hover:-translate-y-0.5
                          transition-all
                        "
                      >
                        <span>{reply.emoji}</span>
                        <span>{reply.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-lg
                        ${msg.from === 'me'
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-br-sm shadow-purple-500/30'
                          : 'bg-white/15 backdrop-blur-md text-white/95 border border-white/20 rounded-bl-sm'}
                      `}
                    >
                      <p>{msg.text}</p>
                      <p
                        className={`
                          text-[10px] mt-1
                          ${msg.from === 'me' ? 'text-purple-100' : 'text-white/60'}
                        `}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Input */}
          {selectedChat && (
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 px-3 py-3 border-t border-white/10"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="
                  flex-1 min-w-0
                  px-4 py-2.5 rounded-full
                  bg-white/10 backdrop-blur-md
                  text-white placeholder:text-white/50
                  text-sm outline-none
                  border border-white/20
                  focus:border-white/40 focus:bg-white/15
                  transition
                "
              />
              <button
                type="submit"
                disabled={!input.trim()}
                style={{ flexShrink: 0 }}
                className="
                  flex items-center justify-center
                  w-10 h-10 rounded-full
                  bg-gradient-to-br from-purple-500 to-pink-500
                  text-white
                  hover:from-purple-400 hover:to-pink-400
                  shadow-lg shadow-purple-500/40
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                  transition
                "
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatPage;