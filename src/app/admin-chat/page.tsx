'use client'
import { useState, useEffect, useRef } from 'react';
import authClient from '@/services/authClient';
import { useRouter } from 'next/navigation';

export default function AdminChat() {
  const [conversations, setConversations] = useState([]);
  const [activeConvo, setActiveConvo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const ws = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const res = await authClient.get('/conversations/');
        setConversations(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          router.push('/login');
        }
      }
    };

    loadConversations();
  }, []);

  const selectConversation = async (convoId) => {
    try {
      if (ws.current) ws.current.close();

      const res = await authClient.get(`/conversations/${convoId}/`);
      setMessages(res.data.message_set);
      setActiveConvo(convoId);

      ws.current = new WebSocket(`ws://localhost:8002/ws/chat/${convoId}/`);

      ws.current.onmessage = (e) => {
        const newMessage = JSON.parse(e.data);
        setMessages(prev => [...prev, newMessage]);
      };

    } catch (error) {
      console.error('Error selecting conversation:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      const message = {
        headers: {
          Authorization: `JWT ${localStorage.getItem('JWT')}`
        },
        message: inputMessage
      };

      ws.current.send(JSON.stringify(message));
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container py-5 px-4">
      <header className="text-center">
        <h1 className="display-4 text-white">Support Dashboard</h1>
        {/* ... Header content ... */}
      </header>

      <div className="row rounded-lg overflow-hidden shadow">
        {/* Conversations List */}
        <div className="col-5 px-0">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <h5 className="mb-0 py-1">Recent</h5>
            </div>
            <div className="messages-box">
              {conversations.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => selectConversation(convo.id)}
                  className={`list-group-item list-group-item-action ${activeConvo === convo.id ? 'active' : ''}`}
                >
                  <div className="media">
                    <div className="media-body ml-4">
                      <h6>{convo.sender_conversation.phone_number}</h6>
                      <p className="text-muted mb-0">
                        {convo.last_message?.text || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-7 px-0">
          <div className="px-4 py-5 chat-box bg-white">
            {messages.map((msg) => (
              <div key={msg.id} className={`media w-50 ${msg.sender === activeConvo ? 'ml-auto' : ''} mb-3`}>
                <div className={`media-body ml-3 ${msg.sender === activeConvo ? 'bg-primary' : 'bg-light'}`}>
                  <p className={`text-small mb-0 ${msg.sender === activeConvo ? 'text-white' : 'text-muted'}`}>
                    {msg.text}
                  </p>
                  <small className="text-muted">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="bg-light">
            <div className="input-group">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="form-control rounded-0 border-0 py-4 bg-light"
                placeholder="Type a message"
              />
              <button type="submit" className="btn btn-success">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
