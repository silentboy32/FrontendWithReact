import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, Users, LogOut, UserX,
  X, Send, Menu, MoreVertical, PanelLeftClose, PanelLeftOpen, Trash2, Search
} from 'lucide-react';

import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg"

import { UserProfile } from '../../Store/UserAuth/UserAuth';

import { MyChat, GetMessage, SendMessage , DeleteMessage } from '../../Store/ChatAuth/ChatAuth';

import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import socket from "../../Store/ChatAuth/Socket";


const ChatPage = () => {


  const Spinner = ({ className = 'w-8 h-8' }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12" cy="12" r="10"
      stroke="currentColor" strokeWidth="4"
    />
    <path
      className="opacity-90"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

  const [selectedChat, setSelectedChat] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState({});
  const messagesEndRef = useRef(null);

  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // ===== Long-press / delete modal state =====
  const [selectedMsg, setSelectedMsg] = useState(null); // full msg object or null
  const pressTimer = useRef(null);
  const longPressTriggered = useRef(false);

  const LONG_PRESS_DURATION = 500;
  const [Loading , setLoading ] = useState(null);


  // Fetch user + chats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserProfile();
        const userId = result.data._id;
        setCurrentUserId(userId);
        setUser(result.data);
        

        const response = await MyChat();

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

        setContacts(friends);

      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load chats"
        );
      }
    };

    fetchData();
  }, []);

  
  // Socket for real time conversation
  // Socket for real time Chat
useEffect(() => {
    if (!currentUserId) return;

    const handleMessageUpdated = ({
        conversationId,
        messageId,
        content,
        isDeletedForEveryone,
    }) => {
        if (!isDeletedForEveryone) return;

        setMessages((prev) => {
            const existing = prev[conversationId] || [];

            return {
                ...prev,
                [conversationId]: existing.map((message) =>
                    String(message.id) === String(messageId)
                        ? {
                              ...message,
                              text: content,
                              isDeletedForEveryone: true,
                          }
                        : message
                ),
            };
        });

        setSelectedMsg((prev) =>
            prev && String(prev.id) === String(messageId)
                ? {
                      ...prev,
                      text: content,
                      isDeletedForEveryone: true,
                  }
                : prev
        );
    };

    const handleMessageDeletedForMe = ({
        conversationId,
        messageId,
    }) => {
        setMessages((prev) => {
            const existing = prev[conversationId] || [];

            return {
                ...prev,
                [conversationId]: existing.filter(
                    (message) =>
                        String(message.id) !== String(messageId)
                ),
            };
        });

        setSelectedMsg((prev) =>
            prev && String(prev.id) === String(messageId)
                ? null
                : prev
        );
    };

    socket.on("message_updated", handleMessageUpdated);
    socket.on("message_deleted_for_me", handleMessageDeletedForMe);

    if (!socket.connected) {
        socket.connect();
    }

    return () => {
        socket.off("message_updated", handleMessageUpdated);
        socket.off("message_deleted_for_me", handleMessageDeletedForMe);
        socket.disconnect();
    };
}, [currentUserId]);

useEffect(() => {
    const conversationId = selectedChat?.conversationId;

    if (!currentUserId || !conversationId) return;

    const joinConversation = () => {
        socket.emit("join_conversation", conversationId);
    };

    const handleReceiveMessage = (msg) => {
        const senderId =
            typeof msg.sender === "object" && msg.sender !== null
                ? msg.sender._id
                : msg.sender;

        const newMessage = {
            id: msg._id,
            from:
                String(senderId) === String(currentUserId)
                    ? "me"
                    : "other",
            text: msg.content,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages((prev) => {
            const existing = prev[conversationId] || [];

            if (
                existing.some(
                    (message) =>
                        String(message.id) === String(newMessage.id)
                )
            ) {
                return prev;
            }

            return {
                ...prev,
                [conversationId]: [...existing, newMessage],
            };
        });
    };

    const handleSocketError = ({ message } = {}) => {
        toast.error(message || "Unable to process chat request");
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("connect", joinConversation);
    socket.on("socket_error", handleSocketError);

    if (socket.connected) {
        joinConversation();
    }

    return () => {
        socket.off("connect", joinConversation);
        socket.off("receive_message", handleReceiveMessage);
        socket.off("socket_error", handleSocketError);
    };
}, [currentUserId, selectedChat?.conversationId]);



  const quickReplies = [
    { emoji: '👋', text: 'Say Hello' },
    { emoji: '🤔', text: 'How are you?' },
    { emoji: '📅', text: 'Meet up soon?' },
  ];

  const currentMessages = selectedChat ? messages[selectedChat.conversationId] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChat]);

  // ===== Close modal on Escape =====
  useEffect(() => {
    if (!selectedMsg) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [selectedMsg]);

  // ===== Long-press handlers =====
  const startPress = (msg) => {
    longPressTriggered.current = false;
    clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      setSelectedMsg(msg);
      
      if (navigator.vibrate) navigator.vibrate(30);
    }, LONG_PRESS_DURATION);
  };

  const cancelPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleBubbleClick = () => {
    if (longPressTriggered.current) {
      longPressTriggered.current = false;
      return;
    }
    if (selectedMsg) closeMenu();
  };

  const closeMenu = () => setSelectedMsg(null);

  // ===== Delete logic =====
  
const handleDelete = async (scope) => {
  if (!selectedMsg || !selectedChat) return;

  if (scope === "everyone" && selectedMsg.from !== "me") {
    closeMenu();
    return;
  }

  const conversationId = selectedChat.conversationId;
  const messageId = selectedMsg.id;

  setLoading(scope);

  try {
    const response = await DeleteMessage(
      conversationId,
      messageId,
      scope
    );

    if (!response.success) {
      toast.error("Unable to delete message");
      return;
    }

    setMessages((prev) => {
      const existing = prev[conversationId] || [];

      if (scope === "me") {
        return {
          ...prev,
          [conversationId]: existing.filter(
            (message) => String(message.id) !== String(messageId)
          ),
        };
      }

      return {
        ...prev,
        [conversationId]: existing.map((message) =>
          String(message.id) === String(messageId)
            ? {
                ...message,
                text: "This message was deleted",
                isDeletedForEveryone: true,
              }
            : message
        ),
      };
    });

    setSelectedMsg(null);

    toast.success(
      scope === "everyone"
        ? "Deleted for everyone"
        : "Deleted for you"
    );
  } catch {
    toast.error("Unable to delete message");
  } finally {
    setLoading(null);
    closeMenu();
  }
};

  // ===== Chat selection / send =====
  const handleSelectChat = async (contact) => {
    setSelectedChat(contact);
    setSidebarOpen(false);
    closeMenu();

    try {
      const result = await GetMessage(contact.conversationId);

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

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };
  

  // Send Message  Function

const sendMessage = (text) => {
    const clean = text.trim();

    if (!clean || !selectedChat) return;

    if (!socket.connected) {
        toast.error("Real-time connection is unavailable");
        return;
    }

    const conversationId = selectedChat.conversationId;

    socket.emit(
        "send_message",
        { conversationId, content: clean },
        (response) => {
            if (!response?.success) {
                toast.error(response?.message || "Failed to send message");
                return;
            }

            const msg = response.message;

            const newMessage = {
                id: msg._id,
                from: "me",
                text: msg.content,
                time: new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            setMessages((prev) => {
                const existing = prev[conversationId] || [];

                if (existing.some((message) => message.id === newMessage.id)) {
                    return prev;
                }

                return {
                    ...prev,
                    [conversationId]: [...existing, newMessage],
                };
            });
        }
    );
};


  // const sendMessage = async (text) => {
  //   const clean = text.trim();

  //   if (!clean || !selectedChat) return;

  //   try {
  //     const result = await SendMessage(clean, selectedChat.conversationId);
  //     const msg = result.data;

  //     const senderId =
  //       typeof msg.sender === "object" && msg.sender !== null
  //         ? msg.sender._id
  //         : msg.sender;

  //     const newMessage = {
  //       id: msg._id,
  //       from: String(senderId) === String(currentUserId) ? "me" : "other",
  //       text: msg.content,
  //       time: new Date(msg.createdAt).toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //     };

  //     setMessages((prev) => ({
  //       ...prev,
  //       [selectedChat.conversationId]: [
  //         ...(prev[selectedChat.conversationId] || []),
  //         newMessage,
  //       ],
  //     }));

  //   } catch (error) {
  //     toast.error("Failed to send message");
  //   }
  // };
  

  const handleQuickReply = (text) => sendMessage(text);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  // ===== Derived: is the selected message mine? =====
  const isOwnMessage = selectedMsg?.from === 'me' && selectedMsg?.text  !== "This message was deleted";
 
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-0 md:p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Toaster />
      <div className="fixed inset-0 bg-purple-900/50 mix-blend-multiply pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-purple-950/80 pointer-events-none"></div>

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

          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
            {contacts.map((contact) => {
              const isActive = selectedChat?.id === contact.id;
              const lastMsg = messages[contact.conversationId]?.slice(-1)[0];

              const id = contact.id;
              const username = contact.username;
              const avatar = contact.username?.charAt(0).toUpperCase() || "?";
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

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          ></div>
        )}

        {/* ===== MAIN CHAT AREA ===== */}
        <main className="flex-1 flex flex-col relative min-w-0">
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
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
                {currentMessages.map((msg) => {
                  const isSelected = selectedMsg?.id === msg.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        onMouseDown={() => startPress(msg)}
                        onMouseUp={cancelPress}
                        onMouseLeave={cancelPress}
                        onTouchStart={() => startPress(msg)}
                        onTouchEnd={cancelPress}
                        onTouchCancel={cancelPress}
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={handleBubbleClick}
                        className={`
                          relative select-none cursor-pointer
                          max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-lg
                          transition-all duration-200
                          ${isSelected ? 'scale-[0.97] ring-2 ring-white/60' : ''}
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
                  );
                })}
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

      {/* ===== DELETE MODAL ===== */}
      {selectedMsg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-backdrop-in bg-black/60 backdrop-blur-sm"
          onClick={closeMenu}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full max-w-sm
              bg-[#0f1720]/95 backdrop-blur-xl
              border border-white/10
              rounded-2xl shadow-2xl
              overflow-hidden
              animate-modal-in
            "
            >


            { Loading ? (

            <div className="flex flex-col items-center-center px-8 py-14 animate-backdrop-in">

              {/* Big spinner */}
              <div className="relative justify-center">
              <Spinner className="w-8 h-6 text-purple-400" />
              </div>

              {/* Label */}
              <p className="text-white text-sm font-medium mt-6">
              {Loading === 'everyone'
              ? 'Deleting for everyone…'
              : 'Deleting for you…'}
              </p>

              <p className="text-white/40 text-xs mt-1.5">
              Please wait a moment
              </p>
            </div>
            )  : (
            
            <div>
              {/* Header */}
            <div className="relative px-6 pt-5 pb-3">
              <h3 className="text-white text-base font-semibold text-center">
                Delete message?
              </h3>
              <button
                onClick={closeMenu}
                className="absolute top-4 right-4 p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message preview */}
            <div className="px-6 pb-4">
              <p className="text-white/50 text-xs text-center line-clamp-2 italic">
                "{selectedMsg.text}"
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10"></div>

            {/* Actions */}
            <div className="flex flex-col">
              {/* Delete for Everyone — only for own messages */}
              {isOwnMessage && (
                <button
                  onClick={() => handleDelete('everyone')}
                  className="
                    flex items-center justify-center gap-2
                    px-6 py-4
                    text-red-400 hover:text-red-300
                    hover:bg-red-500/10
                    font-medium text-sm
                    transition
                    border-b border-white/10
                  "
                >
                  <Trash2 className="w-4 h-4" />
                  Delete for Everyone
                </button>
              )}

              {/* Delete for Me — always */}
              <button
                onClick={() => handleDelete('me')}
                className="
                  flex items-center justify-center gap-2
                  px-6 py-4
                  text-amber-300 hover:text-amber-200
                  hover:bg-amber-500/10
                  font-medium text-sm
                  transition
                  border-b border-white/10
                "
              >
                <Trash2 className="w-4 h-4" />
                Delete for Me
              </button>

              {/* Cancel */}
              <button
                onClick={closeMenu}
                className="
                  px-6 py-4
                  text-white/80 hover:text-white
                  hover:bg-white/5
                  font-medium text-sm
                  transition
                "
              >
                Cancel
              </button>
            </div> 
            </div>

            )};

          </div>    
        </div>
      )}
    </div>
  );
};

export default ChatPage;















// import { useState, useRef, useEffect } from 'react';
// import {
//   MessageCircle, Users, LogOut, UserX,
//   X, Send, Menu, MoreVertical, PanelLeftClose, PanelLeftOpen
// } from 'lucide-react';

// import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg"

// import { UserProfile } from '../../Store/UserAuth/UserAuth';

// import { MyChat, GetMessage, SendMessage } from '../../Store/ChatAuth/ChatAuth';

// import toast from 'react-hot-toast';
// import { Toaster } from 'react-hot-toast';

// const ChatPage = () => {


//   // const [activeTab, setActiveTab] = useState('contacts');
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // 🆕 desktop collapse
//   const [input, setInput] = useState('');

//   const [messages, setMessages] = useState({});
//   const messagesEndRef = useRef(null);

//   const [contacts, setContacts] = useState([]);
//   const [user, setUser] = useState([]);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   // Main code Here Fetch User details 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Step 1: Get the logged-in user's profile
//         const result = await UserProfile();

//         const userId = result.data._id;

//         setCurrentUserId(userId);
//         setUser(result.data);

//         // Step 2: Get the conversations after obtaining the user ID
//         const response = await MyChat();



//         // Step 3: Extract the other participant and last message
//         const friends = response.data.flatMap((conversation) =>
//           conversation.participants
//             .filter(
//               (participant) =>
//                 String(participant._id) !== String(userId)
//             )
//             .map((participant) => ({
//               id: participant._id,
//               username: participant.username,
//               conversationId: conversation._id,
//               lastMessage: conversation.lastMessage?.content || "",
//             }))
//         );

//         // Step 4: Save the extracted data in React state
//         setContacts(friends);

//       } catch (error) {
//         // console.error("Failed to fetch chat data:", error);
//         toast.error(
//           error.response?.data?.message || "Failed to load chats"
//         );
//       }
//     };

//     fetchData();
//   }, []);


//   // Chat Code 

//   const quickReplies = [
//     { emoji: '👋', text: 'Say Hello' },
//     { emoji: '🤔', text: 'How are you?' },
//     { emoji: '📅', text: 'Meet up soon?' },
//   ];

//   // const currentMessages = selectedChat ? messages[selectedChat.id] || [] : [];
//   const currentMessages = selectedChat ? messages[selectedChat.conversationId] || [] : [];

 
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, selectedChat]);


//   const handleSelectChat = async (contact) => {
//     setSelectedChat(contact);
//     setSidebarOpen(false);


//     try {


//       const result = await GetMessage(contact.conversationId);


//       const fetchedMessages = result.data.map((msg) => {
//         const senderId =
//           typeof msg.sender === "object"
//             ? msg.sender._id
//             : msg.sender;

//         return {
//           id: msg._id,
//           from: String(senderId) === String(currentUserId) ? "me" : "other",
//           text: msg.content,
//           time: new Date(msg.createdAt).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         };
//       });

//       setMessages((prev) => ({
//         ...prev,
//         [contact.conversationId]: fetchedMessages,
//       }));
//     } catch (error) {
//       console.error("Failed to fetch messages:", error);
//     }
//   };
//   // const handleSelectChat = (contact) => {
//   //   // setSelectedChat(contact);
//   //   // setSidebarOpen(false);

//   // };

//   const handleSend = (e) => {
//     e.preventDefault();
//     sendMessage(input);
//     setInput('');
//   };




//   const sendMessage = async (text) => {
//     const clean = text.trim();

//     if (!clean || !selectedChat) return;

//     try {
//       // Send the message to your backend
//       const result = await SendMessage(
//         clean,
//         selectedChat.conversationId
//       );

//       // Get the message saved in MongoDB
//       const msg = result.data;

//       const senderId =
//         typeof msg.sender === "object" && msg.sender !== null
//           ? msg.sender._id
//           : msg.sender;

//       // Convert backend data into your UI format
//       const newMessage = {
//         id: msg._id,
//         from:
//           String(senderId) === String(currentUserId)
//             ? "me"
//             : "other",
//         text: msg.content,
//         time: new Date(msg.createdAt).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };

//       // Update the selected conversation
//       setMessages((prev) => ({
//         ...prev,
//         [selectedChat.conversationId]: [
//           ...(prev[selectedChat.conversationId] || []),
//           newMessage,
//         ],
//       }));

//     } catch (error) {
//       toast.error(
//         "Failed to send message:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   // const sendMessage = (text) => {
//   //   const clean = text.trim();
//   //   if (!clean || !selectedChat) return;

//   //   const now = new Date();
//   //   const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

//   //   setMessages((prev) => {
//   //     // const existing = prev[selectedChat.id] || [];
//   //     const existing = prev[selectedChat.conversationId] || [];
//   //     return {
//   //       ...prev,

//   //       [selectedChat.conversationId]: [
//   //         ...existing,
//   //         { id: existing.length + 1, from: 'me', text: clean, time },
//   //       ],
//   //     };
//   //   });
//   // };

//   const handleQuickReply = (text) => sendMessage(text);

//   // 🆕 Unified toggle: collapses sidebar on desktop, closes it on mobile
//   const toggleSidebar = () => {
//     if (window.innerWidth < 768) {
//       setSidebarOpen((prev) => !prev);
//     } else {
//       setSidebarCollapsed((prev) => !prev);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-0 md:p-6"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >

//       <Toaster    />
//       <div className="fixed inset-0 bg-purple-900/50 mix-blend-multiply pointer-events-none"></div>
//       <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-purple-950/80 pointer-events-none"></div>

//       {/* Main Chat Container */}
//       <div className="relative z-10 w-full max-w-6xl h-screen md:h-[85vh] bg-white/10 backdrop-blur-md md:rounded-2xl border border-white/20 shadow-2xl flex overflow-hidden">

//         {/* ===== SIDEBAR ===== */}
//         <aside
//           className={`
//             absolute md:relative z-30
//             h-full flex flex-col
//             bg-purple-950/60 backdrop-blur-xl md:bg-white/5
//             border-r border-white/10
//             transition-all duration-300 ease-in-out
//             w-72 md:w-80
//             ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//             ${sidebarCollapsed ? 'md:-ml-80 md:opacity-0 md:pointer-events-none' : 'md:ml-0 md:opacity-100'}
//           `}
//         >
//           {/* Sidebar Header */}
//           <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
//             <div className="relative">
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
//                 J
//               </div>
//               <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-900"></span>
//             </div>

//             <div className="flex-1 min-w-0">
//               <p className="text-white font-semibold text-sm truncate">{user.username}</p>
//               <p className="text-emerald-300 text-xs">Online</p>
//             </div>

//             <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition" aria-label="Logout">
//               <LogOut className="w-4 h-4" />
//             </button>
//             <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition" aria-label="Block">
//               <UserX className="w-4 h-4" />
//             </button>

//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="md:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
//               aria-label="Close"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Contact list */}
//           <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
//             {contacts.map((contact) => {

//               const isActive = selectedChat?.id === contact.id;
//               const lastMsg = messages[contact.id]?.slice(-1)[0];

//               const id = contact._id;
//               const username = contact.username;

//               const avatar = contact.username?.charAt(0).toUpperCase() || "?";
//               const conversationId = contacts._id;
//               const lastMessage = contact.lastMessage || "";

//               return (
//                 <button
//                   key={id}
//                   onClick={() => handleSelectChat(contact)}
//                   className={`
//                     w-full flex items-center gap-3 px-3 py-3 rounded-xl
//                     transition text-left
//                     ${isActive
//                       ? 'bg-purple-500/25 border border-purple-400/40'
//                       : 'bg-white/5 border border-white/5 hover:bg-white/10'}
//                   `}
//                 >
//                   <div className="relative" style={{ flexShrink: 0 }}>
//                     <div className="w-10 h-10 rounded-full bg-slate-500/50 flex items-center justify-center text-white font-semibold">
//                       {avatar}
//                     </div>
//                     {contact.status === 'online' && (
//                       <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-900"></span>
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="text-white text-sm font-medium truncate">{username}</p>
//                     {lastMsg && (
//                       <p className="text-white/50 text-xs truncate">{lastMessage}</p>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//         </aside>

//         {/* Contact list */}
//         {/* <div className=
//         {/* Mobile backdrop */}
//         {sidebarOpen && (
//           <div
//             onClick={() => setSidebarOpen(false)}
//             className="md:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
//           ></div>
//         )}

//         {/* ===== MAIN CHAT AREA ===== */}
//         <main className="flex-1 flex flex-col relative min-w-0">
//           {/* Chat Header */}
//           <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
//             {/* 🆕 Toggle button — arrow icon */}
//             <button
//               onClick={toggleSidebar}
//               className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
//               aria-label={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
//               title={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
//             >
//               {sidebarCollapsed ? (
//                 <PanelLeftOpen className="w-5 h-5" />
//               ) : (
//                 <PanelLeftClose className="w-5 h-5" />
//               )}
//             </button>

//             {selectedChat ? (
//               <>
//                 <div className="relative" style={{ flexShrink: 0 }}>
//                   <div className="w-10 h-10 rounded-full bg-slate-500/50 flex items-center justify-center text-white font-semibold">
//                     {selectedChat.username?.charAt(0).toUpperCase() || "?"}
//                   </div>
//                   <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-900"></span>
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <p className="text-white font-semibold text-sm truncate">{selectedChat.username}</p>
//                   <p className="text-emerald-300 text-xs">Online</p>
//                 </div>

//                 <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition">
//                   <MoreVertical className="w-5 h-5" />
//                 </button>
//               </>
//             ) : (
//               <p className="text-white/60 text-sm">Select a contact to start chatting</p>
//             )}
//           </div>

//           {/* Chat Body */}
//           <div className="flex-1 overflow-y-auto px-4 py-6">
//             {!selectedChat ? (
//               <div className="h-full flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="flex justify-center mb-4">
//                     <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
//                       <Users className="w-10 h-10 text-white/40" />
//                     </div>
//                   </div>
//                   <p className="text-white/60 text-sm">Choose a contact from the sidebar to begin</p>
//                 </div>
//               </div>
//             ) : currentMessages.length === 0 ? (
//               <div className="h-full flex items-center justify-center">
//                 <div className="text-center max-w-md">
//                   <div className="flex justify-center mb-6">
//                     <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
//                       <MessageCircle className="w-8 h-8 text-purple-300" />
//                     </div>
//                   </div>

//                   <h2 className="text-white font-semibold text-lg mb-2">
//                     Start your conversation with {selectedChat.username}
//                   </h2>

//                   <p className="text-white/60 text-sm mb-6">
//                     This is the beginning of your conversation. Send a message to start chatting!
//                   </p>

//                   <div className="flex flex-wrap items-center justify-center gap-2">
//                     {quickReplies.map((reply, i) => (
//                       <button
//                         key={i}
//                         onClick={() => handleQuickReply(reply.text)}
//                         className="
//                           flex items-center gap-1.5 px-3 py-1.5 rounded-full
//                           bg-white/10 backdrop-blur-md border border-white/20
//                           text-white/90 text-xs font-medium
//                           hover:bg-white/20 hover:-translate-y-0.5
//                           transition-all
//                         "
//                       >
//                         <span>{reply.emoji}</span>
//                         <span>{reply.text}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {currentMessages.map((msg) => (

//                   <div
                    
//                     key={msg.id}
//                     className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div
//                       className={`
//                         max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-lg
//                         ${msg.from === 'me'
//                           ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-br-sm shadow-purple-500/30'
//                           : 'bg-white/15 backdrop-blur-md text-white/95 border border-white/20 rounded-bl-sm'}
//                       `}
//                     >
//                       <p>{msg.text}</p>
//                       <p
//                         className={`
//                           text-[10px] mt-1
//                           ${msg.from === 'me' ? 'text-purple-100' : 'text-white/60'}
//                         `}
//                       >
//                         {msg.time}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>
//             )}
//           </div>

//           {/* Chat Input */}
//           {selectedChat && (
//             <form
//               onSubmit={handleSend}
//               className="flex items-center gap-2 px-3 py-3 border-t border-white/10"
//             >
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type a message..."
//                 className="
//                   flex-1 min-w-0
//                   px-4 py-2.5 rounded-full
//                   bg-white/10 backdrop-blur-md
//                   text-white placeholder:text-white/50
//                   text-sm outline-none
//                   border border-white/20
//                   focus:border-white/40 focus:bg-white/15
//                   transition
//                 "
//               />
//               <button
//                 type="submit"
//                 disabled={!input.trim()}
//                 style={{ flexShrink: 0 }}
//                 className="
//                   flex items-center justify-center
//                   w-10 h-10 rounded-full
//                   bg-gradient-to-br from-purple-500 to-pink-500
//                   text-white
//                   hover:from-purple-400 hover:to-pink-400
//                   shadow-lg shadow-purple-500/40
//                   disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
//                   transition
//                 "
//                 aria-label="Send"
//               >
//                 <Send className="w-4 h-4" />
//               </button>
//             </form>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;