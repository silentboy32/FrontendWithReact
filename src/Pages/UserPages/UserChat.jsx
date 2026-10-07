import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import backgroundImage from "../../assets/Image-2026-10-06-23.04.13.jpeg"





const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'them', text: 'Hey! How are you doing?', time: '10:24' },
    { id: 2, from: 'me', text: 'Doing great! Just working on a project.', time: '10:25' },
    { id: 3, from: 'them', text: 'Nice! What are you building?', time: '10:25' },
    { id: 4, from: 'me', text: 'A lightweight chat UI. Nothing fancy.', time: '10:26' },
    { id: 5, from: 'them', text: "Sounds cool. Send me a screenshot when it's done 👀", time: '10:27' },
  ]);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: 'me', text, time },
    ]);
    setInput('');
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-0 sm:p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay — same as HomePage */}
      <div className="fixed inset-0 bg-purple-900/50 mix-blend-multiply pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-purple-950/80 pointer-events-none"></div>

      {/* Chat Card — Glassmorphism */}
      <div className="relative z-10 w-full max-w-2xl h-screen sm:h-[85vh] bg-white/10 backdrop-blur-md sm:rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">

        {/* ===== HEADER ===== */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/20 bg-white/5">
          <Link
            to="/"
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/40">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-900"></span>
            </div>

            {/* Name + status */}
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">Alex</p>
              <p className="text-xs text-emerald-300">Online</p>
            </div>
          </div>

          <button
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* ===== MESSAGES ===== */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg) => (
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

        {/* ===== INPUT ===== */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 px-3 py-3 border-t border-white/20 bg-white/5"
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
      </div>
    </div>
  );
};

export default ChatPage;