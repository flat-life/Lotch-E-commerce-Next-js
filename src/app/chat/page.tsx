'use client'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import authClient from '@/services/authClient';

export default function UserChat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [conversationId, setConversationId] = useState(null);
  const ws = useRef(null);
  const router = useRouter();


  useEffect(() => {
    const initChat = async () => {
      try {
        const userRes = await authClient.get('/auth/users/me/');
        const userId = userRes.data.id;
        console.log(userId)

        await authClient.post('/conversations/start/', {
          phone_number: '09353220545'
        });

        setConversationId(userId);
        loadMessages(userId);

        ws.current = new WebSocket(`ws://localhost:8002/ws/chat/${userId}/`);

        console.log(ws.current)
        ws.current.onmessage = (e) => {
          const newMessage = JSON.parse(e.data);
          setMessages(prev => [...prev, newMessage]);
        };

        ws.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        return () => ws.current?.close();
      } catch (error) {
        if (error.response?.status === 401) {
          router.push('/login');
        }
      }
    };

    initChat();
  }, []);

  const loadMessages = async (convoId) => {
    try {
      const res = await authClient.get(`/conversations/${convoId}/`);
      setMessages(res.data.message_set);
    } catch (error) {
      console.error('Error loading messages:', error);
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

      console.log(ws.current)
      ws.current.send(JSON.stringify(message));
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container py-5 px-4">
      <header className="text-center">
        <h1 className="display-4 text-white">Chat With Support</h1>
        {/* ... Header content ... */}
      </header>

      <div className="row rounded-lg overflow-hidden shadow">
        <div className="col-7 px-0">
          <div className="px-4 py-5 chat-box bg-white">
            {messages.map((msg) => (
              <div key={msg.id} className={`media w-50 ${msg.sender === conversationId ? 'ml-auto' : ''} mb-3`}>
                <div className={`media-body ml-3 ${msg.sender === conversationId ? 'bg-primary' : 'bg-light'}`}>
                  <p className={`text-small mb-0 ${msg.sender === conversationId ? 'text-white' : 'text-muted'}`}>
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
